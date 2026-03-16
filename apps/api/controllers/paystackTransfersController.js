const service = require("../services/paystackTransfersService");

const initiate = async (req, res) => {
  try {
    const result = await service.initiateTransfer(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const finalize = async (req, res) => {
  try {
    const result = await service.finalizeTransfer(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const bulk = async (req, res) => {
  try {
    const result = await service.initiateBulkTransfer(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const result = await service.listTransfers(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const fetchOne = async (req, res) => {
  try {
    const result = await service.fetchTransfer(req.params.idOrCode);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const result = await service.verifyTransfer(req.params.reference);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const result = await service.resendOtp(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const disableOtp = async (_req, res) => {
  try {
    const result = await service.disableOtp();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const finalizeDisableOtp = async (req, res) => {
  try {
    const result = await service.finalizeDisableOtp(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const enableOtp = async (_req, res) => {
  try {
    const result = await service.enableOtp();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const balance = async (_req, res) => {
  try {
    const result = await service.getBalance();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const ledger = async (req, res) => {
  try {
    const result = await service.getBalanceLedger(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  initiate,
  finalize,
  bulk,
  list,
  fetchOne,
  verify,
  resendOtp,
  disableOtp,
  finalizeDisableOtp,
  enableOtp,
  balance,
  ledger,
};

/**
 * FILE ROLE:
 * HTTP controller for Paystack transfer endpoints (payouts).
 *
 * CONNECTS TO:
 * - services/paystackTransfersService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - payoutService uses transfer calls for release payouts.
 */
