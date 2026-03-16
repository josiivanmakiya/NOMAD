const LedgerEntry = require("../models/LedgerEntry");

const describeEntry = (entry) => {
  switch (entry.type) {
    case "DEPOSIT_IN":
      return "Deposit received";
    case "RELEASE_OUT":
      return "Release sent";
    case "PENALTY_POOL_IN":
      return "Early unlock fee";
    case "RELOCK_IN":
      return "Relock deposit";
    default:
      return "Ledger entry";
  }
};

const list = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await LedgerEntry.find({ userId })
      .sort({ createdAt: -1 })
      .populate("depositId", "currency")
      .lean();

    const history = entries.map((entry) => ({
      id: entry._id,
      type: entry.type,
      amount: entry.amount,
      currency: entry.depositId?.currency || "NGN",
      date: entry.createdAt,
      description: describeEntry(entry),
      metadata: entry.metadata || {},
    }));

    return res.status(200).json({ ok: true, history });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  list,
};

/**
 * FILE ROLE:
 * Provides a ledger-style history feed for user activity.
 *
 * CONNECTS TO:
 * - models/LedgerEntry
 *
 * USED BY:
 * - routes/historyRoutes.js
 */
