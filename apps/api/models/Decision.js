const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["DEPOSIT_CONFIRM", "RELEASE_CONFIRM", "UNLOCK_CONFIRM"],
      required: true,
    },
    status: {
      type: String,
      enum: ["REQUESTED", "EXECUTED", "FAILED"],
      default: "REQUESTED",
      index: true,
    },
    idempotencyKey: {
      type: String,
      default: "",
      trim: true,
    },
    request: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    error: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Decision", decisionSchema);

/**
 * FILE ROLE:
 * Stores persisted decision records for money-moving actions.
 *
 * CONNECTS TO:
 * - services/decisionService.js
 *
 * USED BY:
 * - controllers/* confirm handlers
 */
