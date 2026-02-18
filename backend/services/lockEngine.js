const LockGroup = require("../models/LockGroup");
const Deposit = require("../models/Deposit");
const Lock = require("../models/Lock");

const MS_IN_DAY = 24 * 60 * 60 * 1000;

const LOCK_TIERS = [
  { min: 1000, max: 5000, days: 1, tier: "entry" },
  { min: 5001, max: 15000, days: 3, tier: "first-pause" },
  { min: 15001, max: 30000, days: 5, tier: "commitment" },
  { min: 30001, max: 50000, days: 7, tier: "reflection" },
  { min: 50001, max: 100000, days: 14, tier: "serious" },
  { min: 100001, max: 250000, days: 21, tier: "discipline" },
  { min: 250001, max: 500000, days: 30, tier: "deep" },
  { min: 500001, max: 750000, days: 60, tier: "long-intent" },
  { min: 750001, max: 999999, days: 90, tier: "extreme-intent" },
  { min: 1000000, max: Number.POSITIVE_INFINITY, days: 90, minDays: 90, tier: "custom" },
];

const resolveTier = (totalLocked, overrideDays) => {
  const amountValue = Number(totalLocked);
  if (!amountValue || Number.isNaN(amountValue) || amountValue < 1000) {
    throw new Error("Total locked amount must be at least ₦1,000.");
  }

  const tier = LOCK_TIERS.find(
    (entry) => amountValue >= entry.min && amountValue <= entry.max
  );

  if (!tier) {
    throw new Error("No lock tier matches this amount.");
  }

  let selectedDays = tier.days;
  if (tier.tier === "custom" && overrideDays != null) {
    const numericDays = Number(overrideDays);
    if (Number.isNaN(numericDays)) {
      throw new Error("Custom duration must be a number of days.");
    }
    if (numericDays < tier.minDays) {
      throw new Error(`Custom duration must be at least ${tier.minDays} days.`);
    }
    selectedDays = numericDays;
  }

  return {
    tier: tier.tier,
    lockDays: selectedDays,
    lockDurationMs: selectedDays * MS_IN_DAY,
  };
};

const computeSchedule = (totalLocked, overrideDays, now = new Date()) => {
  const resolved = resolveTier(totalLocked, overrideDays);
  return {
    ...resolved,
    lockStartAt: now,
    maturesAt: new Date(now.getTime() + resolved.lockDurationMs),
  };
};

const getActiveGroup = async (userId) => {
  return LockGroup.findOne({ userId, state: "ACTIVE" }).sort({ createdAt: -1 });
};

const getTotalLockedAmount = async (userId) => {
  const result = await Deposit.aggregate([
    { $match: { userId, state: "LOCKED" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total || 0;
};

const createLockGroup = async ({ userId, totalLocked, overrideDays, reason }) => {
  const now = new Date();
  const schedule = computeSchedule(totalLocked, overrideDays, now);
  const existing = await getActiveGroup(userId);

  if (existing) {
    existing.state = "REPLACED";
    await existing.save();
  }

  const group = await LockGroup.create({
    userId,
    totalLocked,
    tier: schedule.tier,
    lockDurationMs: schedule.lockDurationMs,
    lockStartAt: schedule.lockStartAt,
    maturesAt: schedule.maturesAt,
    state: "ACTIVE",
    reason,
  });

  return group;
};

const resetAllActiveLockTimers = async ({
  userId,
  lockStartAt,
  maturesAt,
  lockDurationMs,
}) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const lockedDeposits = await Deposit.find({ userId, state: "LOCKED" }).select("_id");
  if (lockedDeposits.length === 0) {
    return { resetCount: 0, depositIds: [] };
  }

  const depositIds = lockedDeposits.map((item) => item._id);
  const result = await Lock.updateMany(
    { depositId: { $in: depositIds } },
    {
      $set: {
        lockDurationMs,
        startDate: lockStartAt,
        maturesAt,
      },
    }
  );

  return {
    resetCount: result.modifiedCount || 0,
    depositIds,
  };
};

module.exports = {
  resolveTier,
  computeSchedule,
  getActiveGroup,
  getTotalLockedAmount,
  createLockGroup,
  resetAllActiveLockTimers,
};

/**
 * FILE ROLE:
 * Canonical time engine for lock tier and maturity computation.
 *
 * CONNECTS TO:
 * - models/LockGroup
 * - models/Deposit
 *
 * USED BY:
 * - services/depositService.js
 * - services/lockService.js
 *
 * INVARIANTS:
 * - Duration derives only from current total locked amount.
 * - maturesAt is calculated server-side from UTC now.
 * - Any new lock group replaces the previous ACTIVE group.
 */
