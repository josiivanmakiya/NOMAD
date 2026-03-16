const { request } = require("./paystackClient");
const { resolveAccount } = require("./paystackVerificationService");
const { normalizeName } = require("./paystackWebhookService");

const createRecipient = async ({
  type,
  name,
  account_number,
  bank_code,
  description,
  currency,
  authorization_code,
  metadata,
}) => {
  if (!type || !name) {
    throw new Error("type and name are required.");
  }

  if (account_number && bank_code) {
    const resolved = await resolveAccount({ account_number, bank_code });
    const resolvedName = resolved?.data?.account_name || "";
    if (normalizeName(resolvedName) !== normalizeName(name)) {
      throw new Error("Account name does not match recipient name.");
    }
  }

  const payload = { type, name };

  if (account_number) payload.account_number = account_number;
  if (bank_code) payload.bank_code = bank_code;
  if (description) payload.description = description;
  if (currency) payload.currency = currency;
  if (authorization_code) payload.authorization_code = authorization_code;
  if (metadata) payload.metadata = metadata;

  return request("POST", "/transferrecipient", payload);
};

const createRecipientsBulk = async ({ batch }) => {
  if (!Array.isArray(batch) || batch.length === 0) {
    throw new Error("batch must be a non-empty array.");
  }
  return request("POST", "/transferrecipient/bulk", { batch });
};

const listRecipients = async (query) => {
  const params = new URLSearchParams(query || {}).toString();
  const path = params ? `/transferrecipient?${params}` : "/transferrecipient";
  return request("GET", path);
};

const fetchRecipient = async (idOrCode) => {
  if (!idOrCode) {
    throw new Error("id_or_code is required.");
  }
  return request("GET", `/transferrecipient/${idOrCode}`);
};

const updateRecipient = async (idOrCode, payload) => {
  if (!idOrCode) {
    throw new Error("id_or_code is required.");
  }
  return request("PUT", `/transferrecipient/${idOrCode}`, payload || {});
};

const deleteRecipient = async (idOrCode) => {
  if (!idOrCode) {
    throw new Error("id_or_code is required.");
  }
  return request("DELETE", `/transferrecipient/${idOrCode}`);
};

module.exports = {
  createRecipient,
  createRecipientsBulk,
  listRecipients,
  fetchRecipient,
  updateRecipient,
  deleteRecipient,
};

/**
 * FILE ROLE:
 * Wraps Paystack transfer recipient APIs and validates account names.
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 * - services/paystackVerificationService.js
 * - services/paystackWebhookService.js (normalizeName)
 *
 * USED BY:
 * - controllers/paystackRecipientsController.js
 * - services/payoutService.js
 */
