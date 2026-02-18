const LockEvent = require("../models/LockEvent");

const toMinorUnits = (amount) => {
  const value = Number(amount || 0);
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.round(value * 100);
};

const appendLockEvent = async ({
  userId,
  lockId,
  depositId,
  type,
  amount,
  metadata = {},
}) => {
  if (!userId || !lockId || !depositId || !type) {
    throw new Error("appendLockEvent requires userId, lockId, depositId, and type.");
  }

  return LockEvent.create({
    userId,
    lockId,
    depositId,
    type,
    amountMinor: toMinorUnits(amount),
    metadata,
  });
};

module.exports = {
  appendLockEvent,
};
