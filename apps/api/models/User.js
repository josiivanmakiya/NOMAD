const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    userType: {
      type: String,
      enum: ["individual", "business"],
      default: "individual",
      index: true,
    },
    status: {
      type: String,
      enum: ["waitlist", "active", "suspended"],
      default: "waitlist",
      index: true,
    },
    isGenesisUser: {
      type: Boolean,
      default: false,
      index: true,
    },
    tier: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
      index: true,
    },
    passwordHash: {
      type: String,
      required: false,
    },
    pinHash: {
      type: String,
      required: false,
    },
    verifiedName: {
      type: String,
      trim: true,
    },
    identityStatus: {
      type: String,
      enum: ["unverified", "pending", "verified"],
      default: "unverified",
    },
    identityProvider: {
      type: String,
      trim: true,
    },
    primaryCurrency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    profileSettings: {
      bio: {
        type: String,
        trim: true,
      },
      avatarUrl: {
        type: String,
        trim: true,
      },
    },
    kycVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      aiTone: {
        type: String,
        default: "Nomad Insight",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    metrics: {
      timerCheckCount: {
        type: Number,
        default: 0,
        min: 0,
      },
      failedUnlockAttempts: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalResets: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    currentPoints: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    disciplineTier: {
      type: String,
      default: "Seedling",
      trim: true,
      index: true,
    },
    currentStreakDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastPointsCalculatedAt: {
      type: Date,
      required: false,
    },
    protocolSettings: {
      autoRelock: {
        type: Boolean,
        default: false,
      },
      extractionAmount: {
        type: Number,
        min: 0,
      },
      extractionFrequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", null],
        default: null,
      },
    },
    emergencyUnlocks: {
      year: {
        type: Number,
        default: new Date().getFullYear(),
      },
      used: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

/**
 * FILE ROLE:
 * Stores user identities and emergency unlock usage.
 *
 * CONNECTS TO:
 * - services/unlockService.js
 *
 * USED BY:
 * - services/unlockService.js (emergency tracking)
 *
 * NOTES:
 * - Request-level auth enforcement is handled by middleware/requireAuth.js.
 */
