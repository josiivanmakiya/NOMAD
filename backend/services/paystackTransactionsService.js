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
  return String(Math.round(numeric));
};

const ensureEmail = (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Email is required.");
  }
  return email.trim().toLowerCase();
};

const ensureReference = (reference) => {
  if (!reference) {
    return `delay_${crypto.randomBytes(8).toString("hex")}`;
  }
  return reference;
};

const initializeTransaction = async ({
  amount,
  email,
  channels,
  currency,
  reference,
  callback_url,
  plan,
  invoice_limit,
  metadata,
  split_code,
  subaccount,
  transaction_charge,
  bearer,
}) => {
  const payload = {
    amount: ensureAmount(amount),
    email: ensureEmail(email),
    reference: ensureReference(reference),
  };

  if (channels) payload.channels = channels;
  if (currency) payload.currency = currency;
  if (callback_url) payload.callback_url = callback_url;
  if (plan) payload.plan = plan;
  if (invoice_limit) payload.invoice_limit = invoice_limit;
  if (metadata) {
    payload.metadata = typeof metadata === "string" ? metadata : JSON.stringify(metadata);
  }
  if (split_code) payload.split_code = split_code;
  if (subaccount) payload.subaccount = subaccount;
  if (transaction_charge) payload.transaction_charge = transaction_charge;
  if (bearer) payload.bearer = bearer;

  return request("POST", "/transaction/initialize", payload);
};

const verifyTransaction = async (reference) => {
  if (!reference) {
    throw new Error("Reference is required.");
  }
  return request("GET", `/transaction/verify/${reference}`);
};

const listTransactions = async (query) => {
  const params = new URLSearchParams(query || {}).toString();
  const path = params ? `/transaction?${params}` : "/transaction";
  return request("GET", path);
};

const fetchTransaction = async (id) => {
  if (!id) {
    throw new Error("Transaction id is required.");
  }
  return request("GET", `/transaction/${id}`);
};

const chargeAuthorization = async ({
  amount,
  email,
  authorization_code,
  reference,
  currency,
  metadata,
  channels,
  subaccount,
  transaction_charge,
  bearer,
  queue,
}) => {
  if (!authorization_code) {
    throw new Error("authorization_code is required.");
  }

  const payload = {
    amount: ensureAmount(amount),
    email: ensureEmail(email),
    authorization_code,
    reference: ensureReference(reference),
  };

  if (currency) payload.currency = currency;
  if (metadata) {
    payload.metadata = typeof metadata === "string" ? metadata : JSON.stringify(metadata);
  }
  if (channels) payload.channels = channels;
  if (subaccount) payload.subaccount = subaccount;
  if (transaction_charge) payload.transaction_charge = transaction_charge;
  if (bearer) payload.bearer = bearer;
  if (queue !== undefined) payload.queue = queue;

  return request("POST", "/transaction/charge_authorization", payload);
};

const transactionTimeline = async (idOrReference) => {
  if (!idOrReference) {
    throw new Error("id_or_reference is required.");
  }
  return request("GET", `/transaction/timeline/${idOrReference}`);
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
  listTransactions,
  fetchTransaction,
  chargeAuthorization,
  transactionTimeline,
};

/**
 * FILE ROLE:
 * Wraps Paystack transaction APIs for initialization and verification.
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 *
 * USED BY:
 * - controllers/paystackTransactionsController.js
 *
 * NOTES:
 * - Verification data can back deposit funding checks.
 */
