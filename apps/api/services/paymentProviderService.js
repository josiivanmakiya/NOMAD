const ExternalPayment = require("../models/ExternalPayment");
const { resolveAccount } = require("./paystackVerificationService");

const createInbound = async ({ userId, amount, currency = "NGN", reference }) => {
  if (!reference) {
    throw new Error("A verified inbound payment reference is required.");
  }
  const ref = String(reference).trim();
  const payment = await ExternalPayment.create({
    userId,
    reference: ref,
    amount: Math.round(Number(amount) * 100),
    currency,
    direction: "inbound",
    status: "pending",
  });
  return payment;
};

const confirmInbound = async ({ reference }) => {
  const payment = await ExternalPayment.findOneAndUpdate(
    { reference, direction: "inbound" },
    { $set: { status: "success" } },
    { new: true }
  );
  if (!payment) {
    throw new Error("Inbound payment not found.");
  }
  return payment;
};

const createOutbound = async ({ userId, amount, currency = "NGN" }) => {
  const reference = `out_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const payment = await ExternalPayment.create({
    userId,
    reference,
    amount: Math.round(Number(amount) * 100),
    currency,
    direction: "outbound",
    status: "pending",
  });
  return payment;
};

const validateNuban = ({ accountNumber, bankCode }) => {
  const normalized = String(accountNumber || "").trim();
  if (normalized.length !== 10) {
    return { valid: false, reason: "Account number must be 10 digits." };
  }
  if (!bankCode) {
    return { valid: false, reason: "Bank code is required." };
  }
  // Placeholder for real NUBAN checksum validation.
  return { valid: true };
};

const verifyAccountOwnership = async ({ accountNumber, bankCode, accountName }) => {
  const nubanCheck = validateNuban({ accountNumber, bankCode });
  if (!nubanCheck.valid) {
    return { matched: false, reason: nubanCheck.reason };
  }

  const resolved = await resolveAccount({
    account_number: String(accountNumber).trim(),
    bank_code: String(bankCode).trim(),
  });
  const providerName = String(resolved?.data?.account_name || "").trim();
  const submittedName = String(accountName || "").trim();
  if (!providerName) {
    return { matched: false, reason: "Could not verify account name with provider." };
  }

  const normalizeName = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (normalizeName(submittedName) !== normalizeName(providerName)) {
    return { matched: false, reason: "Account name does not match provider record." };
  }

  return { matched: true, verifiedName: providerName };
};

module.exports = {
  createInbound,
  confirmInbound,
  createOutbound,
  verifyAccountOwnership,
  validateNuban,
};

/**
 * FILE ROLE:
 * Payment provider adapter for payment references and account verification.
 *
 * CONNECTS TO:
 * - models/ExternalPayment.js
 */
