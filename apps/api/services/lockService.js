const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");
const LockGroup = require("../models/LockGroup");
const { appendLockEvent } = require("./lockEventService");
const { awardDisciplinePoints } = require("./disciplineService");

const checkMaturity = async () => {
  const now = new Date();

  const groupsToMature = await LockGroup.find({
    state: "ACTIVE",
    maturesAt: { $lte: now },
  }).select("_id userId");

  if (groupsToMature.length > 0) {
    const userIds = groupsToMature.map((group) => group.userId);
    const depositsToMature = await Deposit.find({
      userId: { $in: userIds },
      state: "LOCKED",
    }).select("_id userId amount");
    await LockGroup.updateMany(
      { _id: { $in: groupsToMature.map((group) => group._id) } },
      { $set: { state: "MATURED" } }
    );
    const result = await Deposit.updateMany(
      { userId: { $in: userIds }, state: "LOCKED" },
      { $set: { state: "MATURED" } }
    );
    const locks = await Lock.find({
      depositId: { $in: depositsToMature.map((deposit) => deposit._id) },
    }).select("_id depositId");
    const lockByDepositId = new Map(locks.map((lock) => [String(lock.depositId), lock]));
    await Promise.all(
      depositsToMature.map((deposit) => {
        const lock = lockByDepositId.get(String(deposit._id));
        if (!lock) {
          return null;
        }
        return Promise.all([
          appendLockEvent({
            userId: deposit.userId,
            lockId: lock._id,
            depositId: deposit._id,
            type: "MATURED",
            amount: deposit.amount,
          }),
          awardDisciplinePoints({
            userId: deposit.userId,
            action: "maturedDeposit",
            relatedDepositId: deposit._id,
            idempotencyKey: `matured:${deposit._id}`,
            metadata: { source: "lockService.checkMaturity" },
          }),
        ]);
      })
    );
    return { maturedCount: result.modifiedCount || 0 };
  }

  // Backward-safe fallback for legacy lock records.
  const locksToMature = await Lock.find({ maturesAt: { $lte: now } }).select(
    "_id depositId"
  );

  if (locksToMature.length === 0) {
    return { maturedCount: 0 };
  }

  const depositIds = locksToMature.map((lock) => lock.depositId);
  const depositsToMature = await Deposit.find({
    _id: { $in: depositIds },
    state: "LOCKED",
  }).select("_id userId amount");
  const result = await Deposit.updateMany(
    { _id: { $in: depositIds }, state: "LOCKED" },
    { $set: { state: "MATURED" } }
  );
  const lockByDepositId = new Map(locksToMature.map((lock) => [String(lock.depositId), lock]));
  await Promise.all(
    depositsToMature.map((deposit) => {
      const lock = lockByDepositId.get(String(deposit._id));
      if (!lock) {
        return null;
      }
      return Promise.all([
        appendLockEvent({
          userId: deposit.userId,
          lockId: lock._id,
          depositId: deposit._id,
          type: "MATURED",
          amount: deposit.amount,
        }),
        awardDisciplinePoints({
          userId: deposit.userId,
          action: "maturedDeposit",
          relatedDepositId: deposit._id,
          idempotencyKey: `matured:${deposit._id}`,
          metadata: { source: "lockService.checkMaturity_legacy" },
        }),
      ]);
    })
  );

  return { maturedCount: result.modifiedCount || 0 };
};

const listLocks = async (userId) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const locks = await Lock.find({ userId })
    .sort({ createdAt: -1 })
    .populate("depositId")
    .lean();

  return locks;
};

module.exports = {
  checkMaturity,
  listLocks,
};

/**
 * FILE ROLE:
 * Matures deposits based on maturesAt and lists locks for users.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/Lock
 * - models/LockGroup
 *
 * USED BY:
 * - controllers/lockController.js
 * - jobs/unlockLocks.js
 *
 * NOTES:
 * - LockGroup maturesAt is the single source of truth for timing.
 */

/**
 * NOMAD LAWS (RESPONSIBILITY):
 * - Time is server-owned and monotonic.
 * - State transitions are monotonic.
 *
 * STATE TRANSITIONS (TARGET):
 * - LOCKED → MATURED
 *
 * INVARIANTS (MUST NOT VIOLATE):
 * - Maturity cannot occur early or be replayed.
 * - Maturity must not regress a deposit state.
 */

