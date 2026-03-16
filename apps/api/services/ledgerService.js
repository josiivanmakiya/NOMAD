const LedgerEntry = require("../models/LedgerEntry");

const recordEntry = async ({
  userId,
  depositId,
  type,
  amount,
  direction,
  account,
  metadata = {},
}) => {
  if (!userId) {
    throw new Error("Ledger entry requires userId.");
  }
  if (!type) {
    throw new Error("Ledger entry requires type.");
  }
  if (amount == null || Number.isNaN(Number(amount)) || Number(amount) < 0) {
    throw new Error("Ledger entry amount must be a non-negative number.");
  }

  const entry = await LedgerEntry.create({
    userId,
    depositId,
    type,
    direction,
    account,
    amount,
    metadata,
  });

  return entry;
};

module.exports = {
  recordEntry,
};

/**
 * FILE ROLE:
 * Writes immutable ledger entries for deposits, releases, and penalties.
 *
 * CONNECTS TO:
 * - models/LedgerEntry
 *
 * USED BY:
 * - services/depositService.js
 * - services/releaseService.js
 * - services/unlockService.js
 *
 * NOTES:
 * - Ledger entries are append-only for auditability.
 */
