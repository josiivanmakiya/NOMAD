const crypto = require("crypto");

const { request } = require("./paystackClient");

const ensureAmount = (amount) => {
  if (amount === undefined || amount === null) {
    throw new Error("Amount is required.");
  }
  const numeric = Number(amount);
  if (Number.isNaN(numeric) || numeric <= 0) {
    throw new Error("Amount must be a positive number (subunit).");
  }
  return String(Math.round(numeric));
};

const ensureEmail = (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Email is required.");
  }
  return email.trim().toLowerCase();
};

const ensureReference = (reference) => {
  if (!reference) {
    return `delay_chg_${crypto.randomBytes(8).toString("hex")}`;
  }
  return reference;
};

const createCharge = async (payload) => {
  if (!payload) {
    throw new Error("payload is required.");
  }
  const body = {
    ...payload,
    amount: ensureAmount(payload.amount),
    email: ensureEmail(payload.email),
  };
  if (payload.reference) {
    body.reference = payload.reference;
  } else {
    body.reference = ensureReference();
  }
  return request("POST", "/charge", body);
};

const submitPin = async ({ pin, reference }) => {
  if (!pin || !reference) {
    throw new Error("pin and reference are required.");
  }
  return request("POST", "/charge/submit_pin", { pin, reference });
};

const submitOtp = async ({ otp, reference }) => {
  if (!otp || !reference) {
    throw new Error("otp and reference are required.");
  }
  return request("POST", "/charge/submit_otp", { otp, reference });
};

const submitPhone = async ({ phone, reference }) => {
  if (!phone || !reference) {
    throw new Error("phone and reference are required.");
  }
  return request("POST", "/charge/submit_phone", { phone, reference });
};

const submitBirthday = async ({ birthday, reference }) => {
  if (!birthday || !reference) {
    throw new Error("birthday and reference are required.");
  }
  return request("POST", "/charge/submit_birthday", { birthday, reference });
};

const submitAddress = async ({ reference, address, city, state, zip_code }) => {
  if (!reference || !address || !city || !state || !zip_code) {
    throw new Error("reference, address, city, state, and zip_code are required.");
  }
  return request("POST", "/charge/submit_address", {
    reference,
    address,
    city,
    state,
    zip_code,
  });
};

const checkPending = async (reference) => {
  if (!reference) {
    throw new Error("reference is required.");
  }
  return request("GET", `/charge/${reference}`);
};

module.exports = {
  createCharge,
  submitPin,
  submitOtp,
  submitPhone,
  submitBirthday,
  submitAddress,
  checkPending,
};

/**
 * FILE ROLE:
 * Wraps Paystack charge APIs for card/bank authorization flows.
 *
 * CONNECTS TO:
 * - services/paystackClient.js
 *
 * USED BY:
 * - controllers/paystackChargeController.js
 *
 * NOTES:
 * - Not wired into deposit funding yet.
 */
