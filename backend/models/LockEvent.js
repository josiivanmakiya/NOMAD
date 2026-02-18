const mongoose = require("mongoose");

const LOCK_EVENT_TYPES = ["CREATED", "RELOCKED", "BROKEN", "MATURED", "RELEASED", "LOCKED"];

const lockEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    lockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lock",
      required: true,
      index: true,
    },
    depositId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deposit",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: LOCK_EVENT_TYPES,
      required: true,
      index: true,
    },
    amountMinor: {
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

module.exports = mongoose.model("LockEvent", lockEventSchema);
