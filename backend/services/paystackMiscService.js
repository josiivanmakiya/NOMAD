const { request } = require("./paystackClient");

const listBanks = async (query) => {
  const params = new URLSearchParams(query || {}).toString();
  const path = params ? `/bank?${params}` : "/bank";
  return request("GET", path);
};

const listCountries = async () => request("GET", "/country");

module.exports = {
  listBanks,
  listCountries,
};

/**
 * FILE ROLE:
 * Wraps Paystack misc endpoints (banks, countries).
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 *
 * USED BY:
 * - controllers/paystackMiscController.js
 */
