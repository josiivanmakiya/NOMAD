const mongoose = require("mongoose");

const EVENT_ACTIONS = [
  "DEPOSIT_CREATED",
  "DEPOSIT_LOCKED",
  "EARLY_BREACH_ATTEMPT",
  "EARLY_BREACH_CONFIRMED",
  "MATURITY_WITHDRAWAL",
  "VIEWED_LOCKED_FUNDS",
];

const eventLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  action: {
    type: String,
    enum: EVENT_ACTIONS,
    required: true,
    index: true,
  },
  metadata: {
    amount: Number,
    lockDurationDays: Number,
    penaltyIncurred: Number,
    previousBalance: Number,
    newBalance: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("EventLog", eventLogSchema);
