const mongoose = require("mongoose");

const genesisAuditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    weekOf: {
      type: Date,
      required: true,
      index: true,
    },
    frictionCheck: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    impulseCheck: {
      type: Number,
      required: true,
      min: 0,
    },
    insightValue: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

genesisAuditSchema.index({ userId: 1, weekOf: 1 }, { unique: true });

module.exports = mongoose.model("GenesisAudit", genesisAuditSchema);

