const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    state: {
      type: String,
      enum: ["LOCKED", "MATURED", "RELEASED"],
      default: "LOCKED",
      index: true,
    },
    fundingReference: {
      type: String,
      trim: true,
    },
    releaseReference: {
      type: String,
      trim: true,
    },
    lockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lock",
    },
    ruleVersion: {
      type: Number,
      required: true,
    },
    ruleSetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RuleSet",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deposit", depositSchema);

/**
 * FILE ROLE:
 * Stores per-deposit records with timing and funding references.
 *
 * CONNECTS TO:
 * - models/Lock
 * - models/User
 *
 * USED BY:
 * - services/depositService.js
 * - services/releaseService.js
 * - services/unlockService.js
 *
 * NOTES:
 * - Each deposit is its own timer and lifecycle.
 */
