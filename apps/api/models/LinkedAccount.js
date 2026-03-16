const mongoose = require("mongoose");

const linkedAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    bankCode: {
      type: String,
      trim: true,
      required: true,
    },
    bankName: {
      type: String,
      trim: true,
      required: true,
    },
    accountNumber: {
      type: String,
      trim: true,
      required: true,
    },
    accountName: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["verified", "pending", "rejected"],
      default: "verified",
    },
    last4: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LinkedAccount", linkedAccountSchema);

/**
 * FILE ROLE:
 * Linked external bank accounts for closed-loop rails.
 *
 * NOTES:
 * - accountNumber should be encrypted at rest in production.
 */
