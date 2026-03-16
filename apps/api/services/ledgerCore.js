const { recordEntry } = require("./ledgerService");

const recordEscrowIn = async ({ userId, depositId, amount, metadata }) => {
  return recordEntry({
    userId,
    depositId,
    type: "ESCROW_IN",
    direction: "IN",
    account: "USER_ESCROW",
    amount,
    metadata,
  });
};

const recordEscrowOut = async ({ userId, depositId, amount, metadata }) => {
  return recordEntry({
    userId,
    depositId,
    type: "ESCROW_OUT",
    direction: "OUT",
    account: "USER_ESCROW",
    amount,
    metadata,
  });
};

const recordAvailableIn = async ({ userId, depositId, amount, metadata }) => {
  return recordEntry({
    userId,
    depositId,
    type: "AVAILABLE_IN",
    direction: "IN",
    account: "USER_AVAILABLE",
    amount,
    metadata,
  });
};

const recordAvailableOut = async ({ userId, depositId, amount, metadata }) => {
  return recordEntry({
    userId,
    depositId,
    type: "AVAILABLE_OUT",
    direction: "OUT",
    account: "USER_AVAILABLE",
    amount,
    metadata,
  });
};

const recordPenaltyIn = async ({ userId, depositId, amount, metadata }) => {
  return recordEntry({
    userId,
    depositId,
    type: "PENALTY_IN",
    direction: "IN",
    account: "PENALTY_POOL",
    amount,
    metadata,
  });
};

module.exports = {
  recordEscrowIn,
  recordEscrowOut,
  recordAvailableIn,
  recordAvailableOut,
  recordPenaltyIn,
};

/**
 * FILE ROLE:
 * Ledger core helpers for escrow/available/penalty accounts.
 *
 * CONNECTS TO:
 * - services/ledgerService.js
 */
