const mongoose = require("mongoose");

const lockSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: false,
      index: true,
    },
    depositId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deposit",
      required: true,
      index: true,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: false,
      index: true,
    },
    amount: {
      type: Number,
      required: false,
      min: 0,
    },
    lockDurationMs: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    maturesAt: {
      type: Date,
      required: true,
      index: true,
    },
    unlockDate: {
      type: Date,
      required: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "released", "cancelled"],
      default: "active",
    },
    penaltyProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PenaltyProfile",
      required: false,
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

lockSchema.methods.isMatured = function isMatured() {
  return new Date() >= this.maturesAt;
};

module.exports = mongoose.model("Lock", lockSchema);

/**
 * FILE ROLE:
 * Stores timing metadata for each deposit lock.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/User
 *
 * USED BY:
 * - services/lockService.js
 * - services/depositService.js
 * - services/unlockService.js (timer resets)
 *
 * NOTES:
 * - maturesAt is the timing source of truth.
 */
