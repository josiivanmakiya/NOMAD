const mongoose = require("mongoose");

const pointsLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    points: {
      type: Number,
      required: true,
    },
    relatedDepositId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deposit",
      required: false,
      index: true,
    },
    idempotencyKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PointsLog", pointsLogSchema);
