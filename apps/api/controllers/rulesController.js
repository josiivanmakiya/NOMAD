const RuleSet = require("../models/RuleSet");
const PenaltyProfile = require("../models/PenaltyProfile");
const { getCurrentRuleSet } = require("../services/rulesService");

const getCurrent = async (_req, res) => {
  try {
    const ruleSet = await getCurrentRuleSet();
    if (!ruleSet) {
      return res.status(404).json({ ok: false, message: "No active rule set found." });
    }

    const penaltyProfile = await PenaltyProfile.findById(ruleSet.penaltyProfileId);
    return res.status(200).json({
      ok: true,
      ruleSet,
      penaltyProfile,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const getActive = async (req, res) => getCurrent(req, res);

const createPenaltyProfile = async (req, res) => {
  try {
    const { name, basePercent, minPercent, capPercent } = req.body;
    const profile = await PenaltyProfile.create({
      name,
      basePercent,
      minPercent,
      capPercent,
      isActive: true,
    });

    return res.status(201).json({ ok: true, profile });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const createRuleSet = async (req, res) => {
  try {
    const { minAmount, maxAmount, lockDurationMs, penaltyProfileId, version, isActive } = req.body;

    let nextVersion = version;
    if (!nextVersion) {
      const latest = await RuleSet.findOne().sort({ version: -1 });
      nextVersion = latest ? latest.version + 1 : 1;
    }

    const ruleSet = await RuleSet.create({
      version: nextVersion,
      minAmount,
      maxAmount,
      lockDurationMs,
      penaltyProfileId,
      isActive: isActive !== false,
    });

    return res.status(201).json({ ok: true, ruleSet });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getCurrent,
  getActive,
  createPenaltyProfile,
  createRuleSet,
};

/**
 * FILE ROLE:
 * CRUD endpoints for legacy rule sets and penalty profiles.
 *
 * CONNECTS TO:
 * - models/RuleSet
 * - models/PenaltyProfile
 * - services/rulesService.js (getCurrentRuleSet)
 *
 * USED BY:
 * - routes/rulesRoutes.js
 *
 * NOTES:
 * - Core lock rules are now enforced in rulesService constants.
 * - Kept for backward compatibility/admin tooling.
 */
