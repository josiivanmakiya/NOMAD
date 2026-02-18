const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["deposit", "buy", "sell", "dividend", "lock", "unlock"],
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
      default: "CAD",
      trim: true,
      uppercase: true,
    },
    memo: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "posted", "locked", "unlocked"],
      default: "posted",
      index: true,
    },
    linkedLockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lock",
      required: false,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);

/**
 * FILE ROLE:
 * Legacy transaction model (non-core to NOMAD flow).
 *
 * CONNECTS TO:
 * - models/Account
 * - models/Lock
 *
 * USED BY:
 * - services/postProcessingService.js
 *
 * NOTES:
 * - NOMAD core uses Deposit + Lock instead.
 */

