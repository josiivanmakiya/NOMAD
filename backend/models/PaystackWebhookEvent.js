const mongoose = require("mongoose");

const paystackWebhookEventSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      index: true,
    },
    reference: {
      type: String,
      default: null,
      index: true,
    },
    signature: {
      type: String,
      default: null,
    },
    payload: {
      type: Object,
      required: true,
    },
    receivedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    processed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaystackWebhookEvent", paystackWebhookEventSchema);

/**
 * FILE ROLE:
 * Stores Paystack webhook payloads for idempotency and auditing.
 *
 * CONNECTS TO:
 * - services/paystackWebhookService.js
 *
 * USED BY:
 * - controllers/paystackWebhookController.js
 */
