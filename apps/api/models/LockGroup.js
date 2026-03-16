const mongoose = require("mongoose");

const lockGroupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    totalLocked: {
      type: Number,
      required: true,
      min: 0,
    },
    tier: {
      type: String,
      required: true,
      trim: true,
    },
    lockDurationMs: {
      type: Number,
      required: true,
      min: 0,
    },
    lockStartAt: {
      type: Date,
      required: true,
    },
    maturesAt: {
      type: Date,
      required: true,
      index: true,
    },
    state: {
      type: String,
      enum: ["ACTIVE", "MATURED", "REPLACED"],
      default: "ACTIVE",
      index: true,
    },
    reason: {
      type: String,
      default: "deposit",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LockGroup", lockGroupSchema);

/**
 * FILE ROLE:
 * Canonical per-user lock state for time enforcement.
 *
 * CONNECTS TO:
 * - services/lockEngine.js
 *
 * USED BY:
 * - services/depositService.js
 * - services/lockService.js
 *
 * INVARIANTS:
 * - Only one ACTIVE lock group per user at any time.
 * - maturesAt is written once per lock cycle.
 * - totalLocked and tier are derived from current locked amount only.
 */
