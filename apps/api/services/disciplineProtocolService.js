const RecurringProtocol = require("../models/RecurringProtocol");
const ExternalPayment = require("../models/ExternalPayment");
const User = require("../models/User");
const { chargeAuthorization } = require("./paystackTransactionsService");
const { confirmDeposit } = require("./depositService");

const RUNS_PER_YEAR = {
  daily: 365,
  weekly: 52,
  monthly: 12,
};

const assertCurrency = (currency) => {
  const normalized = String(currency || "NGN").toUpperCase();
  if (normalized !== "NGN") {
    throw new Error("Only NGN protocols are supported for now.");
  }
  return normalized;
};

const getEstimatedFeeMinor = () => {
  const fee = Number(process.env.RECURRING_CHARGE_FEE_MINOR || 0);
  return Number.isFinite(fee) && fee >= 0 ? Math.round(fee) : 0;
};

const getNextRunAt = (from, frequency) => {
  const next = new Date(from);
  if (frequency === "daily") next.setDate(next.getDate() + 1);
  if (frequency === "weekly") next.setDate(next.getDate() + 7);
  if (frequency === "monthly") next.setMonth(next.getMonth() + 1);
  return next;
};

const estimateYearlyCostMinor = (frequency) => {
  const feeMinor = getEstimatedFeeMinor();
  const runs = RUNS_PER_YEAR[frequency] || 0;
  return feeMinor * runs;
};

const recommendLeastExpensiveFrequency = () => {
  const options = ["daily", "weekly", "monthly"].map((frequency) => ({
    frequency,
    estimatedYearlyFeeMinor: estimateYearlyCostMinor(frequency),
    estimatedRunsPerYear: RUNS_PER_YEAR[frequency],
  }));
  options.sort((a, b) => a.estimatedYearlyFeeMinor - b.estimatedYearlyFeeMinor);
  return {
    recommended: options[0],
    options,
  };
};

const createProtocol = async ({
  userId,
  authCode,
  userEmail,
  amount,
  currency,
  frequency,
  provider,
  isAutoRelockEnabled,
}) => {
  if (!userId) throw new Error("User is required.");
  if (!["daily", "weekly", "monthly"].includes(String(frequency || "").toLowerCase())) {
    throw new Error("Frequency must be daily, weekly, or monthly.");
  }
  if (Number(amount) < 1000) {
    throw new Error("Amount must be at least ₦1,000.");
  }
  if (!authCode) {
    throw new Error("Recurring authorization code is required.");
  }

  const normalizedCurrency = assertCurrency(currency);
  const normalizedFrequency = String(frequency).toLowerCase();
  const user = await User.findById(userId).select("email").lean();
  const email = String(userEmail || user?.email || "").trim().toLowerCase();
  if (!email) {
    throw new Error("A verified user email is required for recurring charges.");
  }

  const now = new Date();
  const protocol = await RecurringProtocol.create({
    userId,
    provider: provider || "paystack",
    authCode,
    userEmail: email,
    amount: Number(amount),
    currency: normalizedCurrency,
    frequency: normalizedFrequency,
    status: "active",
    extractionStatus: "active",
    isAutoRelockEnabled: Boolean(isAutoRelockEnabled),
    failedAttemptsCount: 0,
    nextChargeDate: getNextRunAt(now, normalizedFrequency),
    lastChargeStatus: "created",
  });

  await User.updateOne(
    { _id: userId },
    {
      $set: {
        "protocolSettings.autoRelock": Boolean(isAutoRelockEnabled),
        "protocolSettings.extractionAmount": Number(amount),
        "protocolSettings.extractionFrequency": normalizedFrequency,
        status: "active",
      },
    }
  );

  return protocol;
};

const listProtocols = async (userId) => {
  return RecurringProtocol.find({ userId }).sort({ createdAt: -1 }).lean();
};

const updateProtocolStatus = async ({ userId, protocolId, status }) => {
  const protocol = await RecurringProtocol.findOne({ _id: protocolId, userId });
  if (!protocol) throw new Error("Protocol not found.");
  if (protocol.status === "cancelled") throw new Error("Protocol already cancelled.");
  protocol.status = status;
  protocol.extractionStatus = status === "active" ? "active" : "paused";
  if (status === "active" && protocol.nextChargeDate < new Date()) {
    protocol.nextChargeDate = getNextRunAt(new Date(), protocol.frequency);
  }
  protocol.lastChargeStatus = `status_${status}`;
  await protocol.save();
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        "protocolSettings.extractionFrequency": protocol.frequency,
      },
    }
  );
  return protocol;
};

const chargeToken = async (protocol) => {
  if (protocol.provider !== "paystack") {
    throw new Error("Only paystack recurring provider is supported currently.");
  }

  const response = await chargeAuthorization({
    authorization_code: protocol.authCode,
    email: protocol.userEmail,
    amount: Math.round(Number(protocol.amount) * 100),
    currency: protocol.currency,
    metadata: { recurringProtocolId: String(protocol._id) },
  });

  const data = response?.data || {};
  const status = String(data.status || "").toLowerCase();
  return {
    success: status === "success",
    reference: data.reference || `rec_${Date.now()}_${protocol._id}`,
    rawStatus: status || "unknown",
  };
};

const markChargeAsExternalPayment = async ({ userId, reference, amount, currency }) => {
  await ExternalPayment.findOneAndUpdate(
    { reference },
    {
      $set: {
        provider: "paystack",
        reference,
        direction: "inbound",
        status: "success",
        amount: Math.round(Number(amount) * 100),
        currency: String(currency || "NGN").toUpperCase(),
        channel: "recurring_protocol",
        customerEmail: "",
        recipientCode: "",
        raw: { source: "recurring_protocol" },
      },
      $setOnInsert: {
        userId,
      },
    },
    { upsert: true, new: true }
  );
};

const processProtocol = async (protocol) => {
  const now = new Date();
  try {
    const charge = await chargeToken(protocol);
    if (!charge.success) {
      protocol.status = "failed";
      protocol.extractionStatus = "paused";
      protocol.failedAttemptsCount += 1;
      protocol.lastChargeStatus = "failed";
      protocol.lastChargeReference = charge.reference || "";
      protocol.nextChargeDate = getNextRunAt(now, protocol.frequency);
      await protocol.save();
      return { ok: false, reason: "charge_failed" };
    }

    await markChargeAsExternalPayment({
      userId: protocol.userId,
      reference: charge.reference,
      amount: protocol.amount,
      currency: protocol.currency,
    });

    await confirmDeposit(protocol.userId, protocol.amount, {
      currency: protocol.currency,
      fundingReference: charge.reference,
      allowMock: false,
    });

    protocol.status = "active";
    protocol.extractionStatus = "active";
    protocol.lastChargeStatus = "success";
    protocol.lastChargeReference = charge.reference;
    protocol.runsCompleted += 1;
    protocol.failedAttemptsCount = 0;
    protocol.nextChargeDate = getNextRunAt(now, protocol.frequency);
    await protocol.save();
    return { ok: true };
  } catch (error) {
    protocol.status = "failed";
    protocol.extractionStatus = "paused";
    protocol.failedAttemptsCount += 1;
    protocol.lastChargeStatus = `failed:${error.message}`;
    protocol.nextChargeDate = getNextRunAt(now, protocol.frequency);
    await protocol.save();
    return { ok: false, reason: error.message };
  }
};

const processDueProtocols = async () => {
  const now = new Date();
  let processed = 0;
  let failed = 0;
  let dueCount = 0;

  while (true) {
    const batch = await RecurringProtocol.find({
      status: "active",
      nextChargeDate: { $lte: now },
    })
      .sort({ nextChargeDate: 1 })
      .limit(50);

    if (batch.length === 0) {
      break;
    }

    dueCount += batch.length;
    for (const protocol of batch) {
      const result = await processProtocol(protocol);
      if (result.ok) {
        processed += 1;
      } else {
        failed += 1;
      }
    }
  }

  return {
    dueCount,
    processed,
    failed,
  };
};

module.exports = {
  createProtocol,
  listProtocols,
  updateProtocolStatus,
  processDueProtocols,
  recommendLeastExpensiveFrequency,
};
