const service = require("../services/paystackTransactionsService");

const initialize = async (req, res) => {
  try {
    const result = await service.initializeTransaction(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const result = await service.verifyTransaction(req.params.reference);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const result = await service.listTransactions(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const fetchOne = async (req, res) => {
  try {
    const result = await service.fetchTransaction(req.params.id);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const chargeAuthorization = async (req, res) => {
  try {
    const result = await service.chargeAuthorization(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const timeline = async (req, res) => {
  try {
    const result = await service.transactionTimeline(req.params.idOrReference);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  initialize,
  verify,
  list,
  fetchOne,
  chargeAuthorization,
  timeline,
};

/**
 * FILE ROLE:
 * HTTP controller for Paystack transaction endpoints.
 *
 * CONNECTS TO:
 * - services/paystackTransactionsService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - Can be used to verify funding before creating a deposit.
 */
