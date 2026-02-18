const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      default: "CAD",
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["normal", "NOMAD"],
      default: "normal",
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);

/**
 * FILE ROLE:
 * Legacy account model (not currently used by NOMAD core flows).
 *
 * CONNECTS TO:
 * - models/Transaction
 *
 * USED BY:
 * - Legacy transaction code paths only
 *
 * NOTES:
 * - NOMAD payout uses explicit bank recipient details instead.
 */

