const LinkedAccount = require("../models/LinkedAccount");

const assertClosedLoopRecipient = async ({ userId, recipient }) => {
  if (!recipient || !recipient.account_number || !recipient.bank_code) {
    throw new Error("Recipient bank details are required.");
  }

  const linked = await LinkedAccount.findOne({
    userId,
    bankCode: recipient.bank_code,
    accountNumber: recipient.account_number,
    status: "verified",
  }).lean();

  if (!linked) {
    const error = new Error("Security Breach: Closed-loop violation.");
    error.code = "CLOSED_LOOP_VIOLATION";
    throw error;
  }

  return true;
};

module.exports = {
  assertClosedLoopRecipient,
};
