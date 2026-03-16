const RuleSet = require("../models/RuleSet");
const { computeSchedule, resolveTier } = require("./lockEngine");

const RULE_VERSION = 1;

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const getCurrentRuleSet = async () => {
  return RuleSet.findOne({ isActive: true }).sort({ version: -1, createdAt: -1 });
};

const resolveLockDurationMs = (amount, overrideDays) => {
  const amountValue = Number(amount);
  if (amount == null || Number.isNaN(amountValue) || amountValue <= 0) {
    throw new Error("Amount must be a positive number.");
  }

  const schedule = computeSchedule(amountValue, overrideDays);
  const tier = resolveTier(amountValue, overrideDays);

  return {
    lockDurationMs: schedule.lockDurationMs,
    lockDays: schedule.lockDays,
    rule: { tier: tier.tier },
  };
};

const evaluateDeposit = async (amount, overrideDays) => {
  const resolved = resolveLockDurationMs(amount, overrideDays);
  const maturesAt = new Date(Date.now() + resolved.lockDurationMs);

  return {
    lockDurationMs: resolved.lockDurationMs,
    lockDays: resolved.lockDays,
    maturesAt,
    ruleVersion: RULE_VERSION,
    ruleSetId: null,
  };
};

const getUnlockFeePercent = ({ mode, isEmergency }) => {
  if (isEmergency) return 0;
  if (mode === "all") return 0.07;
  return 0.05;
};

const calculateUnlockFee = ({ amount, mode, isEmergency }) => {
  const feePercent = getUnlockFeePercent({ mode, isEmergency });
  const feeAmount = roundMoney(Number(amount || 0) * feePercent);
  return { feeAmount, feePercent };
};

module.exports = {
  getCurrentRuleSet,
  resolveLockDurationMs,
  evaluateDeposit,
  getUnlockFeePercent,
  calculateUnlockFee,
  RULE_VERSION,
};

/**
 * FILE ROLE:
 * Central source of truth for NOMAD lock duration rules and fee logic.
 *
 * CONNECTS TO:
 * - models/RuleSet (legacy lookup only)
 *
 * USED BY:
 * - services/depositService.js
 * - services/unlockService.js
 *
 * NOTES:
 * - Duration mapping is sourced from lockEngine (canonical tiers).
 * - Fees are friction-only and recorded to a penalty pool ledger.
 */

