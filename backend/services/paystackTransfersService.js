const crypto = require("crypto");

const { request } = require("./paystackClient");

const ensureAmount = (amount) => {
  if (amount === undefined || amount === null) {
    throw new Error("Amount is required.");
  }
  const numeric = Number(amount);
  if (Number.isNaN(numeric) || numeric <= 0) {
    throw new Error("Amount must be a positive number (subunit).");
  }
  return Math.round(numeric);
};

const ensureReference = (reference) => {
  if (!reference) {
    return `delay_trf_${crypto.randomBytes(8).toString("hex")}`;
  }
  return reference;
};

const initiateTransfer = async ({
  source = "balance",
  amount,
  recipient,
  reference,
  reason,
  currency,
  account_reference,
}) => {
  if (!recipient) {
    throw new Error("recipient is required.");
  }

  const payload = {
    source,
    amount: ensureAmount(amount),
    recipient,
    reference: ensureReference(reference),
  };

  if (reason) payload.reason = reason;
  if (currency) payload.currency = currency;
  if (account_reference) payload.account_reference = account_reference;

  return request("POST", "/transfer", payload);
};

const finalizeTransfer = async ({ transfer_code, otp }) => {
  if (!transfer_code || !otp) {
    throw new Error("transfer_code and otp are required.");
  }
  return request("POST", "/transfer/finalize_transfer", { transfer_code, otp });
};

const initiateBulkTransfer = async ({ source = "balance", currency, transfers }) => {
  if (!Array.isArray(transfers) || transfers.length === 0) {
    throw new Error("transfers is required and must be a non-empty array.");
  }
  const payload = { source, transfers };
  if (currency) payload.currency = currency;
  return request("POST", "/transfer/bulk", payload);
};

const listTransfers = async (query) => {
  const params = new URLSearchParams(query || {}).toString();
  const path = params ? `/transfer?${params}` : "/transfer";
  return request("GET", path);
};

const fetchTransfer = async (idOrCode) => {
  if (!idOrCode) {
    throw new Error("id_or_code is required.");
  }
  return request("GET", `/transfer/${idOrCode}`);
};

const verifyTransfer = async (reference) => {
  if (!reference) {
    throw new Error("reference is required.");
  }
  return request("GET", `/transfer/verify/${reference}`);
};

const resendOtp = async ({ transfer_code, reason }) => {
  if (!transfer_code || !reason) {
    throw new Error("transfer_code and reason are required.");
  }
  return request("POST", "/transfer/resend_otp", { transfer_code, reason });
};

const disableOtp = async () => request("POST", "/transfer/disable_otp");

const finalizeDisableOtp = async ({ otp }) => {
  if (!otp) {
    throw new Error("otp is required.");
  }
  return request("POST", "/transfer/disable_otp_finalize", { otp });
};

const enableOtp = async () => request("POST", "/transfer/enable_otp");

const getBalance = async () => request("GET", "/balance");

const getBalanceLedger = async (query) => {
  const params = new URLSearchParams(query || {}).toString();
  const path = params ? `/balance/ledger?${params}` : "/balance/ledger";
  return request("GET", path);
};

module.exports = {
  initiateTransfer,
  finalizeTransfer,
  initiateBulkTransfer,
  listTransfers,
  fetchTransfer,
  verifyTransfer,
  resendOtp,
  disableOtp,
  finalizeDisableOtp,
  enableOtp,
  getBalance,
  getBalanceLedger,
};

/**
 * FILE ROLE:
 * Wraps Paystack transfer APIs for payouts and balances.
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 *
 * USED BY:
 * - controllers/paystackTransfersController.js
 * - services/payoutService.js
 */
