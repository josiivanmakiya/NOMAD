const { createRecipient } = require("./paystackRecipientsService");
const { initiateTransfer } = require("./paystackTransfersService");

const DEFAULT_CURRENCY = "NGN";

const ensurePayoutConfig = () => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return false;
  }
  return process.env.ENABLE_PAYOUTS === "true";
};

const initiatePayout = async ({ amount, currency, recipient }) => {
  const normalizedCurrency = String(currency || DEFAULT_CURRENCY).toUpperCase();
  if (normalizedCurrency !== "NGN") {
    throw new Error("Only NGN payouts are supported for now.");
  }
  if (!recipient || !recipient.account_number || !recipient.bank_code || !recipient.name) {
    throw new Error("Recipient bank details are required.");
  }

  const payoutsEnabled = ensurePayoutConfig();
  if (!payoutsEnabled) {
    throw new Error(
      "Payouts are disabled. Set ENABLE_PAYOUTS=true and provide PAYSTACK_SECRET_KEY."
    );
  }

  const recipientResponse = await createRecipient({
    type: "nuban",
    name: recipient.name,
    account_number: recipient.account_number,
    bank_code: recipient.bank_code,
    currency: normalizedCurrency,
  });

  const recipientCode = recipientResponse?.data?.recipient_code;
  if (!recipientCode) {
    throw new Error("Failed to create transfer recipient.");
  }

  const transferResponse = await initiateTransfer({
    amount: Math.round(Number(amount) * 100),
    recipient: recipientCode,
    currency: normalizedCurrency,
    reason: "NOMAD release",
  });

  return {
    reference: transferResponse?.data?.reference || null,
    status: transferResponse?.data?.status || "queued",
  };
};

module.exports = {
  initiatePayout,
};

/**
 * FILE ROLE:
 * Initiates release payouts to user bank accounts.
 *
 * CONNECTS TO:
 * - services/paystackRecipientsService.js
 * - services/paystackTransfersService.js
 *
 * USED BY:
 * - services/releaseService.js
 * - services/unlockService.js
 *
 * NOTES:
 * - Payouts are only to user-owned banks.
 */

/**
 * NOMAD LAWS (RESPONSIBILITY):
 * - Authority is identity-bound (recipient must belong to user).
 * - Money is conserved (payouts account for released funds).
 * - Partial success is forbidden.
 *
 * STATE TRANSITIONS (TARGET):
 * - REQUESTED → SENT → CONFIRMED (payout lifecycle)
 *
 * INVARIANTS (MUST NOT VIOLATE):
 * - Payout must not be redirected mid-flow.
 * - Payout confirmation must precede deposit RELEASED.
 */

