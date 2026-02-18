const service = require("../services/paystackChargeService");

const create = async (req, res) => {
  try {
    const result = await service.createCharge(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const submitPin = async (req, res) => {
  try {
    const result = await service.submitPin(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const submitOtp = async (req, res) => {
  try {
    const result = await service.submitOtp(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const submitPhone = async (req, res) => {
  try {
    const result = await service.submitPhone(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const submitBirthday = async (req, res) => {
  try {
    const result = await service.submitBirthday(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const submitAddress = async (req, res) => {
  try {
    const result = await service.submitAddress(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const checkPending = async (req, res) => {
  try {
    const result = await service.checkPending(req.params.reference);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  create,
  submitPin,
  submitOtp,
  submitPhone,
  submitBirthday,
  submitAddress,
  checkPending,
};

/**
 * FILE ROLE:
 * HTTP controller for Paystack charge flows (card/bank auth steps).
 *
 * CONNECTS TO:
 * - services/paystackChargeService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - Not directly tied to NOMAD deposits yet.
 */

