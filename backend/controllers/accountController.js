const LinkedAccount = require("../models/LinkedAccount");
const { verifyAccountOwnership } = require("../services/paymentProviderService");

const linkAccount = async (req, res) => {
  try {
    const { bankCode, bankName, accountNumber, accountName } = req.body || {};
    const userId = req.user.id;

    if (!bankCode || !accountNumber || !accountName || !bankName) {
      return res
        .status(400)
        .json({ ok: false, message: "Bank, account number, and name are required." });
    }

    const verification = await verifyAccountOwnership({
      accountNumber,
      bankCode,
      accountName,
    });

    if (!verification.matched) {
      return res.status(400).json({ ok: false, message: verification.reason });
    }

    const normalizedNumber = String(accountNumber).trim();
    const linked = await LinkedAccount.create({
      userId,
      bankCode,
      bankName,
      accountNumber: normalizedNumber,
      accountName: accountName.trim(),
      last4: normalizedNumber.slice(-4),
      status: "verified",
    });

    return res.status(201).json({ ok: true, account: linked });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const listAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await LinkedAccount.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ ok: true, accounts });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId } = req.params;
    const removed = await LinkedAccount.findOneAndDelete({ _id: accountId, userId });
    if (!removed) {
      return res.status(404).json({ ok: false, message: "Account not found." });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  linkAccount,
  listAccounts,
  deleteAccount,
};

/**
 * FILE ROLE:
 * Linked account endpoints for closed-loop rails.
 */
