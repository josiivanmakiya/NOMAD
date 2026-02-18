const service = require("../services/paystackMiscService");

const listBanks = async (req, res) => {
  try {
    const result = await service.listBanks(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const listCountries = async (_req, res) => {
  try {
    const result = await service.listCountries();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  listBanks,
  listCountries,
};

/**
 * FILE ROLE:
 * Proxies Paystack miscellaneous data endpoints.
 *
 * CONNECTS TO:
 * - services/paystackMiscService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - Used for bank lists and reference data.
 */
