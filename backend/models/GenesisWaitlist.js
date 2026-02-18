const mongoose = require("mongoose");

const genesisWaitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    biggestLeak: {
      type: String,
      required: true,
      trim: true,
    },
    leakRange: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    tenYearGoal: {
      type: String,
      required: true,
      trim: true,
    },
    agreesResetRule: {
      type: Boolean,
      required: true,
      default: false,
    },
    automationMode: {
      type: String,
      enum: ["manual", "high_protocol"],
      required: true,
      default: "high_protocol",
      index: true,
    },
    status: {
      type: String,
      enum: ["waitlist", "selected", "invited", "enrolled", "rejected"],
      default: "waitlist",
      index: true,
    },
    briefingStage: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GenesisWaitlist", genesisWaitlistSchema);
