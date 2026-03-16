const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");
const ExternalPayment = require("../models/ExternalPayment");
const User = require("../models/User");
const { recordEntry } = require("./ledgerService");
const { appendLockEvent } = require("./lockEventService");
const {
  computeSchedule,
  getTotalLockedAmount,
  createLockGroup,
  resetAllActiveLockTimers,
} = require("./lockEngine");

const DEFAULT_CURRENCY = "NGN";
const RULE_VERSION = 1;

const ensureCurrency = (currency) => {
  const normalized = String(currency || DEFAULT_CURRENCY).toUpperCase();
  if (normalized !== "NGN") {
    throw new Error("Only NGN is supported for now.");
  }
  return normalized;
};

const ensureFunding = async ({ reference, amount }) => {
  if (!reference) {
    throw new Error("Funding reference is required.");
  }

  const payment = await ExternalPayment.findOne({
    reference,
    direction: "inbound",
    status: "success",
  }).lean();

  if (!payment) {
    throw new Error("Funding reference not verified.");
  }

  if (amount != null) {
    const expectedSubunit = Math.round(Number(amount) * 100);
    if (Number(payment.amount || 0) < expectedSubunit) {
      throw new Error("Funding amount is less than requested deposit.");
    }
  }

  return { reference };
};

const previewDeposit = async (userId, amount, options = {}) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const existingLocked = await getTotalLockedAmount(userId);
  const totalLocked = existingLocked + Number(amount || 0);
  const evaluation = computeSchedule(totalLocked, options.durationDays);

  return {
    amount: Number(amount),
    lockDurationMs: evaluation.lockDurationMs,
    maturesAt: evaluation.maturesAt,
    lockDays: evaluation.lockDays,
    ruleVersion: RULE_VERSION,
    ruleSetId: null,
  };
};

const confirmDeposit = async (userId, amount, options = {}) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const currency = ensureCurrency(options.currency);
  const funding = await ensureFunding({
    reference: options.fundingReference,
    amount,
  });

  const existingLocked = await getTotalLockedAmount(userId);
  const totalLocked = existingLocked + Number(amount || 0);
  const evaluation = computeSchedule(totalLocked, options.durationDays);

  const deposit = await Deposit.create({
    userId,
    amount: Number(amount),
    currency,
    state: "LOCKED",
    ruleVersion: RULE_VERSION,
    ruleSetId: null,
    fundingReference: funding.reference,
  });

  const lock = await Lock.create({
    userId,
    depositId: deposit._id,
    lockDurationMs: evaluation.lockDurationMs,
    maturesAt: evaluation.maturesAt,
    startDate: evaluation.lockStartAt,
    ruleVersion: RULE_VERSION,
    ruleSetId: null,
  });

  deposit.lockId = lock._id;
  await deposit.save();

  await appendLockEvent({
    userId,
    lockId: lock._id,
    depositId: deposit._id,
    type: "CREATED",
    amount: deposit.amount,
    metadata: {
      ruleVersion: RULE_VERSION,
      maturesAt: evaluation.maturesAt,
    },
  });

  await appendLockEvent({
    userId,
    lockId: lock._id,
    depositId: deposit._id,
    type: "LOCKED",
    amount: deposit.amount,
    metadata: {
      lockDurationMs: evaluation.lockDurationMs,
      lockStartAt: evaluation.lockStartAt,
      maturesAt: evaluation.maturesAt,
    },
  });

  await createLockGroup({
    userId,
    totalLocked,
    overrideDays: options.durationDays,
    reason: "deposit",
  });

  const timerReset = await resetAllActiveLockTimers({
    userId,
    lockDurationMs: evaluation.lockDurationMs,
    lockStartAt: evaluation.lockStartAt,
    maturesAt: evaluation.maturesAt,
  });

  const refreshedLock = await Lock.findById(lock._id);

  if (timerReset.resetCount > 0) {
    await User.updateOne(
      { _id: userId },
      { $inc: { "metrics.totalResets": 1 } }
    );
  }

  await recordEntry({
    userId,
    depositId: deposit._id,
    type: "DEPOSIT_IN",
    amount: deposit.amount,
    metadata: {
      ruleVersion: RULE_VERSION,
      lockDurationMs: evaluation.lockDurationMs,
      maturesAt: evaluation.maturesAt,
      fundingReference: funding.reference,
    },
  });

  return {
    deposit,
    lock: refreshedLock || lock,
    reset: {
      applied: timerReset.resetCount > 0,
      count: timerReset.resetCount,
    },
  };
};

const listDeposits = async (userId) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const deposits = await Deposit.find({ userId }).sort({ createdAt: -1 }).lean();
  if (deposits.length === 0) {
    return [];
  }

  const depositIds = deposits.map((deposit) => deposit._id);
  const locks = await Lock.find({ depositId: { $in: depositIds } })
    .select("depositId maturesAt lockDurationMs")
    .lean();

  const lockMap = new Map(
    locks.map((lock) => [String(lock.depositId), lock])
  );

  return deposits.map((deposit) => ({
    ...deposit,
    lock: lockMap.get(String(deposit._id)) || null,
  }));
};

module.exports = {
  previewDeposit,
  confirmDeposit,
  listDeposits,
};

/**
 * FILE ROLE:
 * Creates and previews deposits with server-side duration enforcement.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/Lock
 * - models/ExternalPayment (funding verification)
 * - services/ledgerService.js
 * - services/lockEngine.js
 * - models/LockGroup
 *
 * USED BY:
 * - controllers/depositController.js
 *
 * NOTES:
 * - Requires a verified funding reference.
 * - Does not move money; it only records state and timing.
 * - Resets lock timing for all active locked deposits on new funding.
 */

/**
 * NOMAD LAWS (RESPONSIBILITY):
 * - Money is conserved (deposit in must be ledgered).
 * - Authority is identity-bound (funding reference must map to user).
 * - Time is server-owned (duration calculated server-side).
 *
 * STATE TRANSITIONS (TARGET):
 * - CREATED → FUNDED → LOCKED (logical responsibility)
 *
 * INVARIANTS (MUST NOT VIOLATE):
 * - Funding references cannot be reused.
 * - Deposits cannot exist without a corresponding lock.
 * - Client-supplied duration cannot bypass server rules.
 * - Lock timing is derived from total locked amount via lockEngine.
 */

