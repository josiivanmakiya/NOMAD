const mongoose = require("mongoose");

const ruleSetSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
      index: true,
    },
    minAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    maxAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    lockDurationMs: {
      type: Number,
      required: true,
      min: 0,
    },
    penaltyProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PenaltyProfile",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RuleSet", ruleSetSchema);

/**
 * FILE ROLE:
 * Legacy rule set model for lock duration mapping.
 *
 * CONNECTS TO:
 * - models/PenaltyProfile
 *
 * USED BY:
 * - controllers/rulesController.js
 *
 * NOTES:
 * - Current NOMAD lock rules are enforced in rulesService constants.
 */

