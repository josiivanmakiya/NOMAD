const mongoose = require("mongoose");

const disciplineProtocolSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    sourceAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LinkedAccount",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1000,
    },
    currency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    frequency: {
      type: String,
      enum: ["DAILY", "WEEKLY", "MONTHLY"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED", "CANCELLED"],
      default: "ACTIVE",
      index: true,
    },
    nextRunAt: {
      type: Date,
      required: true,
      index: true,
    },
    lastRunAt: {
      type: Date,
      default: null,
    },
    runsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxRuns: {
      type: Number,
      default: null,
      min: 1,
    },
    latestResult: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DisciplineProtocol", disciplineProtocolSchema);
