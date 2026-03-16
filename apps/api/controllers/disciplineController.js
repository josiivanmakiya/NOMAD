const {
  awardDisciplinePoints,
  getDisciplineProfile,
  getTierConfig,
  recalculateUserTier,
} = require("../services/disciplineService");

const me = async (req, res) => {
  try {
    const profile = await getDisciplineProfile(req.user.id);
    return res.status(200).json({ ok: true, profile });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const tiers = async (_req, res) => {
  try {
    const items = await getTierConfig();
    return res.status(200).json({ ok: true, tiers: items });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const award = async (req, res) => {
  try {
    const { action, relatedDepositId, idempotencyKey, metadata } = req.body || {};
    const result = await awardDisciplinePoints({
      userId: req.user.id,
      action,
      relatedDepositId,
      idempotencyKey,
      metadata,
    });
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const recalc = async (req, res) => {
  try {
    const result = await recalculateUserTier(req.user.id);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  me,
  tiers,
  award,
  recalc,
};
