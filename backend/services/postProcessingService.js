const Transaction = require("../models/Transaction");

const applyRules = async (transactionId) => {
  if (!transactionId) {
    return null;
  }

  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return null;
  }

  if (transaction.status === "locked") {
    return transaction;
  }

  if (transaction.memo && /grocery/i.test(transaction.memo)) {
    transaction.category = "Groceries";
    await transaction.save();
  }

  return transaction;
};

module.exports = {
  applyRules,
};

/**
 * FILE ROLE:
 * Legacy post-processing for transactions (currently unused).
 *
 * CONNECTS TO:
 * - models/Transaction
 *
 * USED BY:
 * - No active routes (placeholder/legacy)
 *
 * NOTES:
 * - Not part of NOMAD core flow; kept for compatibility only.
 */

