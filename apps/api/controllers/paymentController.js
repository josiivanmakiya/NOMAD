const {
  createInbound,
  confirmInbound,
  createOutbound,
  verifyAccountOwnership,
  validateNuban,
} = require("../services/paymentProviderService");

const createDepositIntent = async (req, res) => {
  try {
    const { amount, currency, reference } = req.body || {};
    const userId = req.user.id;
    if (!amount) {
      return res.status(400).json({ ok: false, message: "Amount is required." });
    }
    if (!reference) {
      return res.status(400).json({
        ok: false,
        message: "reference is required. Use a verified provider reference.",
      });
    }
    const payment = await createInbound({ userId, amount, currency, reference });
    return res.status(201).json({
      ok: true,
      reference: payment.reference,
      status: payment.status,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const confirmDepositIntent = async (req, res) => {
  try {
    const { reference } = req.body || {};
    if (!reference) {
      return res.status(400).json({ ok: false, message: "Reference is required." });
    }
    const payment = await confirmInbound({ reference });
    return res.status(200).json({ ok: true, status: payment.status });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const createPayout = async (req, res) => {
  try {
    const { amount, currency } = req.body || {};
    const userId = req.user.id;
    if (!amount) {
      return res.status(400).json({ ok: false, message: "Amount is required." });
    }
    const payout = await createOutbound({ userId, amount, currency });
    return res.status(201).json({
      ok: true,
      reference: payout.reference,
      status: payout.status,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { accountNumber, bankCode, accountName } = req.body || {};
    if (!accountNumber || !bankCode || !accountName) {
      return res.status(400).json({ ok: false, message: "Account name, bank code, and number are required." });
    }
    const result = await verifyAccountOwnership({ accountNumber, bankCode, accountName });
    if (!result.matched) {
      return res.status(400).json({ ok: false, message: result.reason || "Account verification failed." });
    }
    return res.status(200).json({ ok: true, verifiedName: result.verifiedName });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const validateAccountNumber = async (req, res) => {
  try {
    const { accountNumber, bankCode } = req.body || {};
    const result = validateNuban({ accountNumber, bankCode });
    if (!result.valid) {
      return res.status(400).json({ ok: false, message: result.reason });
    }
    return res.status(200).json({ ok: true, valid: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  createDepositIntent,
  confirmDepositIntent,
  createPayout,
  verifyAccount,
  validateAccountNumber,
};

/**
 * FILE ROLE:
 * Payment rails endpoints for deposits/payouts.
 */
