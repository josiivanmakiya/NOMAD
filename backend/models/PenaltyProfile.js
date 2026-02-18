const mongoose = require("mongoose");

const penaltyProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    basePercent: {
      type: Number,
      required: true,
      min: 0,
    },
    minPercent: {
      type: Number,
      required: true,
      min: 0,
    },
    capPercent: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PenaltyProfile", penaltyProfileSchema);

/**
 * FILE ROLE:
 * Legacy penalty profile model (no longer used in core unlock logic).
 *
 * CONNECTS TO:
 * - models/RuleSet
 *
 * USED BY:
 * - controllers/rulesController.js
 *
 * NOTES:
 * - Core fees are now defined in rulesService constants.
 */
