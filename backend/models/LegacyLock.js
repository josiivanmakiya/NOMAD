const mongoose = require("mongoose");

const legacyLockSchema = new mongoose.Schema(
  {
    grantorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    beneficiaryName: {
      type: String,
      required: true,
      trim: true,
    },
    beneficiaryDOB: {
      type: Date,
      required: true,
    },
    targetAge: {
      type: Number,
      default: 21,
      min: 1,
      max: 120,
    },
    amount: {
      type: Number,
      required: true,
      min: 1000,
    },
    isIrrevocable: {
      type: Boolean,
      default: false,
      index: true,
    },
    irrevocableAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["growing", "matured", "transferred"],
      default: "growing",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LegacyLock", legacyLockSchema);

