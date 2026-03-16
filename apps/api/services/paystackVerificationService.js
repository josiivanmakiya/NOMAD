const { request } = require("./paystackClient");

const resolveAccount = async ({ account_number, bank_code }) => {
  if (!account_number || !bank_code) {
    throw new Error("account_number and bank_code are required.");
  }
  const qs = new URLSearchParams({ account_number, bank_code }).toString();
  return request("GET", `/bank/resolve?${qs}`);
};

const validateAccount = async ({
  account_name,
  account_number,
  account_type,
  bank_code,
  country_code,
  document_type,
  document_number,
}) => {
  if (
    !account_name ||
    !account_number ||
    !account_type ||
    !bank_code ||
    !country_code ||
    !document_type
  ) {
    throw new Error("Missing required validation fields.");
  }
  return request("POST", "/bank/validate", {
    account_name,
    account_number,
    account_type,
    bank_code,
    country_code,
    document_type,
    document_number,
  });
};

const resolveBin = async (bin) => {
  if (!bin) {
    throw new Error("bin is required.");
  }
  return request("GET", `/decision/bin/${bin}`);
};

module.exports = {
  resolveAccount,
  validateAccount,
  resolveBin,
};

/**
 * FILE ROLE:
 * Wraps Paystack verification APIs for bank and BIN checks.
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 *
 * USED BY:
 * - controllers/paystackVerificationController.js
 * - services/paystackRecipientsService.js
 */
