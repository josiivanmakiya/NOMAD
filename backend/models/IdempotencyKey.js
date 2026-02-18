const mongoose = require("mongoose");

const idempotencyKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    endpoint: {
      type: String,
      required: true,
      index: true,
    },
    method: {
      type: String,
      required: true,
      default: "POST",
    },
    statusCode: {
      type: Number,
      required: true,
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

idempotencyKeySchema.index({ key: 1, userId: 1, endpoint: 1, method: 1 }, { unique: true });

module.exports = mongoose.model("IdempotencyKey", idempotencyKeySchema);

/**
 * FILE ROLE:
 * Stores idempotent responses for confirm endpoints.
 *
 * CONNECTS TO:
 * - services/idempotencyService.js
 *
 * USED BY:
 * - controllers/* confirm handlers
 */
