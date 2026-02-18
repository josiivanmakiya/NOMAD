const RecurringProtocol = require("../models/RecurringProtocol");
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");
const { appendLockEvent } = require("./lockEventService");
const { awardDisciplinePoints } = require("./disciplineService");

const AUTO_RELOCK_GRACE_MS = 6 * 60 * 60 * 1000;

const getEligibleUserIds = async () => {
  const [protocols, users] = await Promise.all([
    RecurringProtocol.find({
      status: "active",
      extractionStatus: "active",
      isAutoRelockEnabled: true,
    })
      .select("userId")
      .lean(),
    User.find({ "protocolSettings.autoRelock": true })
      .select("_id")
      .lean(),
  ]);

  return [
    ...new Set([
      ...protocols.map((item) => String(item.userId)),
      ...users.map((item) => String(item._id)),
    ]),
  ];
};

const processAutoRelockCandidates = async () => {
  const now = new Date();
  const userIds = await getEligibleUserIds();
  if (!userIds.length) {
    return { scannedUsers: 0, maturedLocks: 0, relocked: 0 };
  }

  const graceCutoff = new Date(now.getTime() - AUTO_RELOCK_GRACE_MS);
  const maturedLocks = await Lock.countDocuments({
    userId: { $in: userIds },
    status: "active",
    maturesAt: { $lte: graceCutoff },
  });

  if (maturedLocks === 0) {
    return {
      scannedUsers: userIds.length,
      maturedLocks: 0,
      relocked: 0,
    };
  }

  const maturedDeposits = await Deposit.find({
    userId: { $in: userIds },
    state: "MATURED",
  })
    .select("_id userId amount lockId")
    .lean();

  if (maturedDeposits.length === 0) {
    return {
      scannedUsers: userIds.length,
      maturedLocks,
      relocked: 0,
    };
  }

  const depositIds = maturedDeposits.map((deposit) => deposit._id);
  const relockCandidates = await Lock.find({
    depositId: { $in: depositIds },
    status: "active",
    maturesAt: { $lte: graceCutoff },
  });

  if (relockCandidates.length === 0) {
    return {
      scannedUsers: userIds.length,
      maturedLocks,
      relocked: 0,
    };
  }

  const depositById = new Map(
    maturedDeposits.map((deposit) => [String(deposit._id), deposit])
  );

  let relocked = 0;
  for (const lock of relockCandidates) {
    const deposit = depositById.get(String(lock.depositId));
    if (!deposit) {
      continue;
    }

    const lockDurationMs = Number(lock.lockDurationMs || 0);
    if (!lockDurationMs || lockDurationMs <= 0) {
      continue;
    }

    const previousMaturesAt = lock.maturesAt;
    const startDate = new Date();
    const maturesAt = new Date(startDate.getTime() + lockDurationMs);

    const updateResult = await Deposit.updateOne(
      { _id: deposit._id, state: "MATURED" },
      { $set: { state: "LOCKED" } }
    );

    if (!updateResult.modifiedCount) {
      continue;
    }

    lock.startDate = startDate;
    lock.maturesAt = maturesAt;
    lock.unlockDate = null;
    await lock.save();

    await appendLockEvent({
      userId: deposit.userId,
      lockId: lock._id,
      depositId: deposit._id,
      type: "RELOCKED",
      amount: deposit.amount,
      metadata: {
        reason: "AUTO_RELOCK_AFTER_MATURITY_GRACE",
        previousMaturesAt,
        graceHours: 6,
      },
    });

    await awardDisciplinePoints({
      userId: deposit.userId,
      action: "autoRelock",
      relatedDepositId: deposit._id,
      idempotencyKey: `autorelock:${deposit._id}:${new Date(previousMaturesAt).toISOString()}`,
      metadata: {
        source: "autoRelockService",
        previousMaturesAt,
        graceHours: 6,
      },
    });

    relocked += 1;
  }

  return {
    scannedUsers: userIds.length,
    maturedLocks,
    relocked,
  };
};

module.exports = {
  processAutoRelockCandidates,
};
