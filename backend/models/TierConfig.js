const mongoose = require("mongoose");

const tierConfigSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    pointsRequired: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    rewards: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TierConfig", tierConfigSchema);
