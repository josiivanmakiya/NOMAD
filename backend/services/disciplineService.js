const TierConfig = require("../models/TierConfig");
const PointsLog = require("../models/PointsLog");
const User = require("../models/User");

const DEFAULT_TIERS = [
  { tier: "Seedling", pointsRequired: 10, rewards: ["disciplined_user_status"] },
  { tier: "Sapling", pointsRequired: 50, rewards: ["micro_loan_preview", "phase2_early_insight"] },
  { tier: "Tree", pointsRequired: 150, rewards: ["capital_bonus_window", "small_asset_guidance"] },
  { tier: "Forest", pointsRequired: 300, rewards: ["community_pool_access", "higher_protocol_flexibility"] },
  { tier: "Ecosystem", pointsRequired: 600, rewards: ["larger_loan_window", "early_rwa_allocation"] },
  { tier: "Sovereign", pointsRequired: 1000, rewards: ["alternative_credit_tier"] },
  { tier: "Legacy", pointsRequired: 2000, rewards: ["high_value_rwa_access", "private_guidance"] },
];

const ACTION_POINTS = {
  maturedDeposit: 1,
  autoRelock: 2,
  avoidEarlyUnlockStreak: 5,
  lockStreakMilestone: 10,
  phase2LargeDeposit: 15,
  taxVaultCompliance: 2,
  earlyUnlockPenalty: -5,
};

const ensureTierConfig = async () => {
  const count = await TierConfig.countDocuments({});
  if (count > 0) {
    return;
  }
  await TierConfig.insertMany(DEFAULT_TIERS);
};

const resolvePointsForAction = (action) => {
  if (!Object.prototype.hasOwnProperty.call(ACTION_POINTS, action)) {
    throw new Error(`Unknown discipline action: ${action}`);
  }
  return ACTION_POINTS[action];
};

const recalculateUserTier = async (userId) => {
  const [totals, tiers] = await Promise.all([
    PointsLog.aggregate([
      { $match: { userId } },
      { $group: { _id: null, sum: { $sum: "$points" } } },
    ]),
    TierConfig.find({ isActive: true }).sort({ pointsRequired: 1 }).lean(),
  ]);

  const currentPoints = Math.max(0, Number(totals?.[0]?.sum || 0));
  let disciplineTier = tiers[0]?.tier || "Seedling";
  for (const tier of tiers) {
    if (currentPoints >= Number(tier.pointsRequired || 0)) {
      disciplineTier = tier.tier;
    }
  }

  await User.updateOne(
    { _id: userId },
    {
      $set: {
        currentPoints,
        disciplineTier,
        lastPointsCalculatedAt: new Date(),
      },
    }
  );

  return { currentPoints, disciplineTier };
};

const awardDisciplinePoints = async ({
  userId,
  action,
  relatedDepositId,
  idempotencyKey,
  metadata = {},
}) => {
  if (!userId) {
    throw new Error("User is required.");
  }
  if (!idempotencyKey) {
    throw new Error("idempotencyKey is required.");
  }

  const points = resolvePointsForAction(action);
  const existing = await PointsLog.findOne({ idempotencyKey }).lean();
  if (existing) {
    return {
      awarded: false,
      points: existing.points,
      alreadyRecorded: true,
      tier: await recalculateUserTier(userId),
    };
  }

  await PointsLog.create({
    userId,
    action,
    points,
    relatedDepositId,
    idempotencyKey,
    metadata,
    timestamp: new Date(),
  });

  const tier = await recalculateUserTier(userId);
  return { awarded: true, points, alreadyRecorded: false, tier };
};

const getDisciplineProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("currentPoints disciplineTier currentStreakDays lastPointsCalculatedAt")
    .lean();
  if (!user) {
    throw new Error("User not found.");
  }

  const [tiers, recentLogs] = await Promise.all([
    TierConfig.find({ isActive: true }).sort({ pointsRequired: 1 }).lean(),
    PointsLog.find({ userId }).sort({ timestamp: -1 }).limit(25).lean(),
  ]);

  const currentPoints = Number(user.currentPoints || 0);
  const currentTierIndex = Math.max(
    0,
    tiers.findIndex((tier) => tier.tier === user.disciplineTier)
  );
  const nextTier = tiers[currentTierIndex + 1] || null;
  const pointsToNextTier = nextTier
    ? Math.max(0, Number(nextTier.pointsRequired || 0) - currentPoints)
    : 0;

  return {
    currentPoints,
    disciplineTier: user.disciplineTier || "Seedling",
    currentStreakDays: Number(user.currentStreakDays || 0),
    nextTier,
    pointsToNextTier,
    recentLogs,
  };
};

const getTierConfig = async () => {
  return TierConfig.find({ isActive: true }).sort({ pointsRequired: 1 }).lean();
};

module.exports = {
  ensureTierConfig,
  awardDisciplinePoints,
  recalculateUserTier,
  getDisciplineProfile,
  getTierConfig,
};
