const mongoose = require("mongoose");

const ledgerEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    depositId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deposit",
      index: true,
    },
    type: {
      type: String,
      enum: [
        "DEPOSIT_IN",
        "RELEASE_OUT",
        "PENALTY_POOL_IN",
        "RELOCK_IN",
        "ESCROW_IN",
        "ESCROW_OUT",
        "AVAILABLE_IN",
        "AVAILABLE_OUT",
        "PENALTY_IN",
        "CLEARING_IN",
        "CLEARING_OUT",
        "PAYOUT_OUT",
      ],
      required: true,
      index: true,
    },
    direction: {
      type: String,
      enum: ["IN", "OUT", "NEUTRAL"],
      default: "NEUTRAL",
      index: true,
    },
    account: {
      type: String,
      enum: ["USER_ESCROW", "USER_AVAILABLE", "PENALTY_POOL", "SYSTEM_CLEARING"],
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LedgerEntry", ledgerEntrySchema);

/**
 * FILE ROLE:
 * Stores immutable ledger entries for NOMAD money movement.
 *
 * CONNECTS TO:
 * - models/Deposit
 * - models/User
 *
 * USED BY:
 * - services/ledgerService.js
 *
 * NOTES:
 * - PENALTY_POOL_IN represents fees held, not destroyed.
 */

