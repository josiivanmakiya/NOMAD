const mongoose = require("mongoose");

const waitlistLogSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      index: true,
    },
    leakRange: {
      type: String,
      trim: true,
      index: true,
    },
    outcome: {
      type: String,
      enum: ["VALIDATION_FAILED", "ALREADY_JOINED", "JOINED", "SERVER_ERROR"],
      required: true,
      index: true,
    },
    errors: [
      {
        field: String,
        message: String,
      },
    ],
    sourcePath: {
      type: String,
      trim: true,
    },
    ip: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WaitlistLog", waitlistLogSchema);
