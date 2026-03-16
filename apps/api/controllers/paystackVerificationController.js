const service = require("../services/paystackVerificationService");

const resolveAccount = async (req, res) => {
  try {
    const result = await service.resolveAccount(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const validateAccount = async (req, res) => {
  try {
    const result = await service.validateAccount(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const resolveBin = async (req, res) => {
  try {
    const result = await service.resolveBin(req.params.bin);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  resolveAccount,
  validateAccount,
  resolveBin,
};

/**
 * FILE ROLE:
 * HTTP controller for Paystack verification endpoints.
 *
 * CONNECTS TO:
 * - services/paystackVerificationService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - Helps confirm bank account ownership before payouts.
 */
