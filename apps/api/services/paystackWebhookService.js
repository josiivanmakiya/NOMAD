const ExternalPayment = require("../models/ExternalPayment");
const PaystackWebhookEvent = require("../models/PaystackWebhookEvent");
const RecurringProtocol = require("../models/RecurringProtocol");

const normalizeName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

const upsertExternalPayment = async ({
  reference,
  direction,
  status,
  amount,
  currency,
  channel,
  customerEmail,
  recipientCode,
  raw,
}) => {
  if (!reference) {
    return;
  }
  await ExternalPayment.findOneAndUpdate(
    { reference },
    {
      provider: "paystack",
      reference,
      direction,
      status,
      amount,
      currency,
      channel,
      customerEmail,
      recipientCode,
      raw,
    },
    { upsert: true, new: true }
  );
};

const handlePaystackEvent = async (event) => {
  if (!event || !event.event) {
    return;
  }

  const eventType = event.event;
  const data = event.data || {};
  const reference = data.reference || null;

  if (reference) {
    const existing = await PaystackWebhookEvent.findOne({
      event: eventType,
      reference,
      processed: true,
    }).lean();
    if (existing) {
      return;
    }
  }

  if (eventType === "charge.success") {
    await upsertExternalPayment({
      reference: data.reference,
      direction: "inbound",
      status: data.status || "success",
      amount: data.amount || 0,
      currency: data.currency || "NGN",
      channel: data.channel || "",
      customerEmail: data?.customer?.email || "",
      raw: event,
    });

    const protocolId = data?.metadata?.recurringProtocolId;
    if (protocolId) {
      const protocol = await RecurringProtocol.findById(protocolId);
      if (protocol) {
        protocol.lastChargeStatus = "success";
        protocol.lastChargeReference = data.reference || "";
        await protocol.save();
      }
    }
  }

  if (eventType === "transfer.success") {
    await upsertExternalPayment({
      reference: data.reference,
      direction: "outbound",
      status: data.status || "success",
      amount: data.amount || 0,
      currency: data.currency || "NGN",
      channel: "transfer",
      customerEmail: data?.recipient?.email || "",
      recipientCode: data?.recipient?.recipient_code || "",
      raw: event,
    });
  }

  if (eventType === "transfer.failed" || eventType === "transfer.reversed") {
    await upsertExternalPayment({
      reference: data.reference,
      direction: "outbound",
      status: eventType === "transfer.failed" ? "failed" : "reversed",
      amount: data.amount || 0,
      currency: data.currency || "NGN",
      channel: "transfer",
      customerEmail: data?.recipient?.email || "",
      recipientCode: data?.recipient?.recipient_code || "",
      raw: event,
    });
  }

  if (reference) {
    await PaystackWebhookEvent.updateMany(
      { event: eventType, reference },
      { $set: { processed: true } }
    );
  }
};

module.exports = {
  handlePaystackEvent,
  normalizeName,
};

/**
 * FILE ROLE:
 * Processes Paystack webhook events and persists external payment records.
 *
 * CONNECTS TO:
 * - models/ExternalPayment
 * - models/PaystackWebhookEvent
 *
 * USED BY:
 * - controllers/paystackWebhookController.js
 *
 * NOTES:
 * - ExternalPayment records back deposit funding verification.
 */
