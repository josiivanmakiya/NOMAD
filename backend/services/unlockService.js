const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");
const User = require("../models/User");
const { recordEntry } = require("./ledgerService");
const { appendLockEvent } = require("./lockEventService");
const { calculateUnlockFee } = require("./rulesService");
const { assertClosedLoopRecipient } = require("./closedLoopService");
const { initiatePayout } = require("./payoutService");

const EMERGENCY_LIMIT_PER_YEAR = 2;

const ensureUserEmergencyStatus = async (userId) => {
  const currentYear = new Date().getFullYear();
  let user = await User.findById(userId);
  if (!user) {
    user = await User.create({
      _id: userId,
      emergencyUnlocks: { year: currentYear, used: 0 },
    });
    return user;
  }

  if (!user.emergencyUnlocks || user.emergencyUnlocks.year !== currentYear) {
    user.emergencyUnlocks = { year: currentYear, used: 0 };
    await user.save();
  }

  return user;
};

const canUseEmergency = (user) =>
  (user.emergencyUnlocks?.used || 0) < EMERGENCY_LIMIT_PER_YEAR;

const consumeEmergency = async (user) => {
  user.emergencyUnlocks.used = (user.emergencyUnlocks?.used || 0) + 1;
  await user.save();
};

const fetchLocksForUser = async (userId) => {
  const deposits = await Deposit.find({ userId }).sort({ createdAt: -1 }).lean();
  if (deposits.length === 0) {
    return { deposits: [], locksByDepositId: new Map() };
  }

  const depositIds = deposits.map((deposit) => deposit._id);
  const locks = await Lock.find({ depositId: { $in: depositIds } })
    .select("depositId maturesAt lockDurationMs")
    .lean();
  const lockMap = new Map(locks.map((lock) => [String(lock.depositId), lock]));
  return { deposits, locksByDepositId: lockMap };
};

const getNonMaturedDeposits = (deposits, locksByDepositId) => {
  const now = new Date();
  return deposits.filter((deposit) => {
    if (deposit.state !== "LOCKED") return false;
    const lock = locksByDepositId.get(String(deposit._id));
    if (!lock) return false;
    return lock.maturesAt.getTime() > now.getTime();
  });
};

const previewUnlockSingle = async ({ userId, depositId, useEmergency }) => {
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

  const remainingTimeMs = Math.max(lock.maturesAt.getTime() - Date.now(), 0);
  if (remainingTimeMs <= 0) {
    throw new Error("Deposit already matured. Use standard release.");
  }

  const emergencyUser = await ensureUserEmergencyStatus(userId);
  const emergencyAvailable = canUseEmergency(emergencyUser);
  const isEmergency = useEmergency === true;
  if (isEmergency && !emergencyAvailable) {
    throw new Error("No emergency unlocks remaining this year.");
  }

  const { deposits, locksByDepositId } = await fetchLocksForUser(userId);
  const nonMaturedDeposits = getNonMaturedDeposits(deposits, locksByDepositId);
  const resetCount = nonMaturedDeposits.filter(
    (item) => String(item._id) !== String(deposit._id)
  ).length;

  const fee = calculateUnlockFee({
    amount: deposit.amount,
    mode: "single",
    isEmergency,
  });

  await User.updateOne(
    { _id: userId },
    { $inc: { "metrics.failedUnlockAttempts": 1 } }
  );

  return {
    mode: "single",
    depositId: deposit._id,
    amount: deposit.amount,
    feeAmount: fee.feeAmount,
    feePercent: fee.feePercent,
    netAmount: Math.max(deposit.amount - fee.feeAmount, 0),
    useEmergency: isEmergency,
    emergencyRemaining: Math.max(EMERGENCY_LIMIT_PER_YEAR - (emergencyUser.emergencyUnlocks?.used || 0), 0),
    willResetTimers: true,
    resetCount,
  };
};

const previewUnlockAll = async ({ userId, useEmergency }) => {
  const emergencyUser = await ensureUserEmergencyStatus(userId);
  const emergencyAvailable = canUseEmergency(emergencyUser);
  const isEmergency = useEmergency === true;
  if (isEmergency && !emergencyAvailable) {
    throw new Error("No emergency unlocks remaining this year.");
  }

  const { deposits, locksByDepositId } = await fetchLocksForUser(userId);
  if (deposits.length === 0) {
    return {
      mode: "all",
      deposits: [],
      totals: { gross: 0, feeTotal: 0, netTotal: 0 },
      useEmergency: isEmergency,
      emergencyRemaining: Math.max(EMERGENCY_LIMIT_PER_YEAR - (emergencyUser.emergencyUnlocks?.used || 0), 0),
    };
  }

  const now = new Date();
  const items = deposits
    .filter((deposit) => deposit.state !== "RELEASED")
    .map((deposit) => {
      const lock = locksByDepositId.get(String(deposit._id));
      const isMatured = lock ? lock.maturesAt.getTime() <= now.getTime() : false;
      const fee = calculateUnlockFee({
        amount: deposit.amount,
        mode: "all",
        isEmergency,
      });
      const feeAmount = isMatured ? 0 : fee.feeAmount;
      return {
        depositId: deposit._id,
        amount: deposit.amount,
        feeAmount,
        netAmount: Math.max(deposit.amount - feeAmount, 0),
        isMatured,
      };
    });

  const totals = items.reduce(
    (acc, item) => {
      acc.gross += item.amount;
      acc.feeTotal += item.feeAmount;
      acc.netTotal += item.netAmount;
      return acc;
    },
    { gross: 0, feeTotal: 0, netTotal: 0 }
  );

  if (items.some((item) => !item.isMatured)) {
    await User.updateOne(
      { _id: userId },
      { $inc: { "metrics.failedUnlockAttempts": 1 } }
    );
  }

  return {
    mode: "all",
    deposits: items,
    totals,
    useEmergency: isEmergency,
    emergencyRemaining: Math.max(EMERGENCY_LIMIT_PER_YEAR - (emergencyUser.emergencyUnlocks?.used || 0), 0),
  };
};

const confirmUnlockSingle = async ({ userId, depositId, useEmergency, recipient }) => {
  const preview = await previewUnlockSingle({ userId, depositId, useEmergency });
  const deposit = await Deposit.findOne({ _id: depositId, userId });
  if (!deposit) {
    throw new Error("Deposit not found.");
  }
  const lock = await Lock.findOne({ depositId: deposit._id, userId });
  if (!lock) {
    throw new Error("Lock not found.");
  }

  if (preview.useEmergency) {
    const user = await ensureUserEmergencyStatus(userId);
    if (!canUseEmergency(user)) {
      throw new Error("No emergency unlocks remaining this year.");
    }
    await consumeEmergency(user);
  }

  if (preview.netAmount > 0) {
    await assertClosedLoopRecipient({
      userId,
      recipient,
    });
  }

  const payout = preview.netAmount > 0
    ? await initiatePayout({
      amount: preview.netAmount,
      currency: deposit.currency,
      recipient,
    })
    : { reference: null, status: "skipped" };

  deposit.state = "RELEASED";
  deposit.releaseReference = payout.reference || null;
  await deposit.save();

  await appendLockEvent({
    userId,
    lockId: lock._id,
    depositId: deposit._id,
    type: "BROKEN",
    amount: preview.amount,
    metadata: {
      mode: "single",
      isEmergency: preview.useEmergency,
      feeAmount: preview.feeAmount,
      netAmount: preview.netAmount,
      payoutReference: payout.reference || null,
      payoutStatus: payout.status || null,
    },
  });

  if (preview.netAmount > 0) {
    await recordEntry({
      userId,
      depositId: deposit._id,
      type: "RELEASE_OUT",
      amount: preview.netAmount,
      metadata: {
        payoutReference: payout.reference || null,
        payoutStatus: payout.status || null,
        isEarly: true,
        mode: "single",
      },
    });
  }

  if (preview.feeAmount > 0) {
    await recordEntry({
      userId,
      depositId: deposit._id,
      type: "PENALTY_POOL_IN",
      amount: preview.feeAmount,
      metadata: {
        mode: "single",
      },
    });
  }

  const { deposits, locksByDepositId } = await fetchLocksForUser(userId);
  const nonMaturedDeposits = getNonMaturedDeposits(deposits, locksByDepositId);
  const resetIds = nonMaturedDeposits
    .filter((item) => String(item._id) !== String(deposit._id))
    .map((item) => item._id);

  if (resetIds.length > 0) {
    const resetLocks = await Lock.find({ depositId: { $in: resetIds } });
    const now = new Date();
    for (const lock of resetLocks) {
      lock.startDate = now;
      lock.maturesAt = new Date(now.getTime() + lock.lockDurationMs);
      await lock.save();
    }
    await User.updateOne(
      { _id: userId },
      { $inc: { "metrics.totalResets": 1 } }
    );
  }

  return {
    deposit,
    release: {
      amount: preview.amount,
      netAmount: preview.netAmount,
      feeAmount: preview.feeAmount,
      isEarly: true,
    },
    resets: {
      count: resetIds.length,
    },
  };
};

const confirmUnlockAll = async ({ userId, useEmergency, recipient }) => {
  const preview = await previewUnlockAll({ userId, useEmergency });

  if (preview.useEmergency) {
    const user = await ensureUserEmergencyStatus(userId);
    if (!canUseEmergency(user)) {
      throw new Error("No emergency unlocks remaining this year.");
    }
    await consumeEmergency(user);
  }

  if (preview.deposits.length === 0) {
    return { deposits: [], totals: preview.totals };
  }

  const totalNet = preview.totals.netTotal;
  if (totalNet > 0) {
    await assertClosedLoopRecipient({
      userId,
      recipient,
    });
  }
  const payout = totalNet > 0
    ? await initiatePayout({
      amount: totalNet,
      currency: "NGN",
      recipient,
    })
    : { reference: null, status: "skipped" };

  for (const item of preview.deposits) {
    const deposit = await Deposit.findOne({ _id: item.depositId, userId });
    if (!deposit || deposit.state === "RELEASED") {
      continue;
    }
    const lock = await Lock.findOne({ depositId: deposit._id, userId });
    if (!lock) {
      continue;
    }

    deposit.state = "RELEASED";
    deposit.releaseReference = payout.reference || null;
    await deposit.save();

    await appendLockEvent({
      userId,
      lockId: lock._id,
      depositId: deposit._id,
      type: item.isMatured ? "RELEASED" : "BROKEN",
      amount: item.amount,
      metadata: {
        mode: "all",
        isEmergency: preview.useEmergency,
        isMatured: item.isMatured,
        feeAmount: item.feeAmount,
        netAmount: item.netAmount,
        payoutReference: payout.reference || null,
        payoutStatus: payout.status || null,
      },
    });

    if (item.netAmount > 0) {
      await recordEntry({
        userId,
        depositId: deposit._id,
        type: "RELEASE_OUT",
        amount: item.netAmount,
        metadata: {
          payoutReference: payout.reference || null,
          payoutStatus: payout.status || null,
          isEarly: !item.isMatured,
          mode: "all",
        },
      });
    }

    if (item.feeAmount > 0) {
      await recordEntry({
        userId,
        depositId: deposit._id,
        type: "PENALTY_POOL_IN",
        amount: item.feeAmount,
        metadata: {
          mode: "all",
        },
      });
    }
  }

  return {
    deposits: preview.deposits,
    totals: preview.totals,
  };
};

module.exports = {
  previewUnlockSingle,
  previewUnlockAll,
  confirmUnlockSingle,
  confirmUnlockAll,
};

/**
 * FILE ROLE:
 * Implements early unlock modes, penalty pool entries, and emergency limits.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/Lock
 * - models/User
 * - services/ledgerService.js
 * - services/rulesService.js
 * - services/payoutService.js
 *
 * USED BY:
 * - controllers/unlockController.js
 *
 * NOTES:
 * - Mode A resets timers for other non-matured deposits.
 * - Emergency unlocks waive fees but still apply time resets.
 */

/**
 * NOMAD LAWS (RESPONSIBILITY):
 * - Friction is the product (fees or emergency usage enforced).
 * - Early unlock consequences cannot be bypassed.
 * - Money is conserved (penalties go to pool, not destroyed).
 * - All money-affecting actions are idempotent.
 *
 * STATE TRANSITIONS (TARGET):
 * - LOCKED → UNLOCK_PREVIEWED → UNLOCK_CONFIRMED → PENALTY_APPLIED → PAYOUT_PENDING → RELEASED
 *
 * INVARIANTS (MUST NOT VIOLATE):
 * - Early unlock cannot release funds without penalty or emergency usage.
 * - Non-matured timers must not be shortened via retries.
 * - Emergency unlock count must not be exceeded.
 */

