const mongoose = require("mongoose");

const externalPaymentSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      default: "paystack",
      index: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    direction: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    channel: {
      type: String,
      default: "",
      trim: true,
    },
    customerEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    recipientCode: {
      type: String,
      default: "",
      trim: true,
    },
    raw: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExternalPayment", externalPaymentSchema);

/**
 * FILE ROLE:
 * Stores raw external payment records from Paystack webhooks.
 *
 * CONNECTS TO:
 * - services/paystackWebhookService.js
 *
 * USED BY:
 * - services/depositService.js (funding verification)
 *
 * NOTES:
 * - Acts as an audit trail for inbound and outbound payments.
 */
