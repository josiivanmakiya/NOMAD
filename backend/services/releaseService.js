const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");
const { recordEntry } = require("./ledgerService");
const { appendLockEvent } = require("./lockEventService");
const { assertClosedLoopRecipient } = require("./closedLoopService");
const { initiatePayout } = require("./payoutService");

const previewRelease = async (userId, depositId) => {
  if (!userId) {
    throw new Error("User is required.");
  }
  if (!depositId) {
    throw new Error("Deposit ID is required.");
  }

  const deposit = await Deposit.findOne({ _id: depositId, userId });
  if (!deposit) {
    throw new Error("Deposit not found.");
  }
  if (deposit.state === "RELEASED") {
    throw new Error("Deposit already released.");
  }
  const lock = await Lock.findOne({ depositId: deposit._id, userId });
  if (!lock) {
    throw new Error("Lock not found.");
  }

  const now = new Date();
  const remainingTimeMs = Math.max(lock.maturesAt.getTime() - now.getTime(), 0);
  if (remainingTimeMs > 0) {
    throw new Error("Deposit not matured. Use early unlock mode instead.");
  }

  return {
    depositId: deposit._id,
    amount: deposit.amount,
    penaltyAmount: 0,
    effectivePercent: 0,
    netAmount: deposit.amount,
    isEarly: false,
    maturesAt: lock.maturesAt,
    state: deposit.state,
  };
};

const confirmRelease = async (userId, depositId, options = {}) => {
  const preview = await previewRelease(userId, depositId);

  const deposit = await Deposit.findOne({ _id: depositId, userId });
  if (!deposit) {
    throw new Error("Deposit not found.");
  }
  if (deposit.state === "RELEASED") {
    throw new Error("Deposit already released.");
  }
  const lock = await Lock.findOne({ depositId: deposit._id, userId });
  if (!lock) {
    throw new Error("Lock not found.");
  }

  await assertClosedLoopRecipient({
    userId,
    recipient: options.recipient,
  });

  const payout = await initiatePayout({
    amount: preview.amount,
    currency: deposit.currency,
    recipient: options.recipient,
  });

  deposit.state = "RELEASED";
  deposit.releaseReference = payout.reference || null;
  await deposit.save();

  await recordEntry({
    userId,
    depositId: deposit._id,
    type: "RELEASE_OUT",
    amount: preview.amount,
    metadata: {
      payoutReference: payout.reference || null,
      payoutStatus: payout.status || null,
      isEarly: false,
    },
  });

  await appendLockEvent({
    userId,
    lockId: lock._id,
    depositId: deposit._id,
    type: "RELEASED",
    amount: preview.amount,
    metadata: {
      isEarly: false,
      payoutReference: payout.reference || null,
      payoutStatus: payout.status || null,
    },
  });

  return {
    deposit,
    release: {
      amount: preview.amount,
      netAmount: preview.netAmount,
      penaltyAmount: 0,
      isEarly: false,
    },
  };
};

module.exports = {
  previewRelease,
  confirmRelease,
};

/**
 * FILE ROLE:
 * Handles matured deposit release to user bank accounts.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/Lock
 * - services/ledgerService.js
 * - services/payoutService.js
 *
 * USED BY:
 * - controllers/releaseController.js
 *
 * NOTES:
 * - Early unlocks are blocked here and routed to unlockService instead.
 */

/**
 * NOMAD LAWS (RESPONSIBILITY):
 * - Matured deposits are never penalized.
 * - Money is conserved (release out is ledgered).
 * - State transitions are monotonic.
 *
 * STATE TRANSITIONS (TARGET):
 * - MATURED → RELEASE_REQUESTED → PAYOUT_PENDING → RELEASED
 *
 * INVARIANTS (MUST NOT VIOLATE):
 * - RELEASED must not occur without payout confirmation.
 * - Duplicate release confirmations must be idempotent.
 */

