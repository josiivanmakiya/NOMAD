const mongoose = require("mongoose");

const recurringProtocolSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: ["paystack", "stripe"],
      default: "paystack",
      index: true,
    },
    authCode: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1000,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
      index: true,
    },
    nextChargeDate: {
      type: Date,
      required: true,
      index: true,
    },
    currency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "failed", "cancelled"],
      default: "active",
      index: true,
    },
    extractionStatus: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
      index: true,
    },
    isAutoRelockEnabled: {
      type: Boolean,
      default: false,
    },
    failedAttemptsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastChargeStatus: {
      type: String,
      default: "created",
      trim: true,
    },
    lastChargeReference: {
      type: String,
      default: "",
      trim: true,
    },
    runsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecurringProtocol", recurringProtocolSchema);
