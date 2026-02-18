const crypto = require("crypto");

const PaystackWebhookEvent = require("../models/PaystackWebhookEvent");
const { handlePaystackEvent } = require("../services/paystackWebhookService");

const verifySignature = (rawBody, signature, secret) => {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");
  return hash === signature;
};

const handleWebhook = async (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret || !signature) {
    return res.status(200).send("ok");
  }

  const rawBody = req.body instanceof Buffer ? req.body : Buffer.from("");

  if (!verifySignature(rawBody, signature, secret)) {
    return res.status(200).send("ok");
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch (err) {
    return res.status(200).send("ok");
  }

  const reference = event?.data?.reference || null;

  await PaystackWebhookEvent.create({
    event: event?.event || "unknown",
    reference,
    signature,
    payload: event,
    processed: false,
  });

  setImmediate(() => {
    handlePaystackEvent(event).catch(() => {});
  });

  return res.status(200).send("ok");
};

module.exports = {
  handleWebhook,
};

/**
 * FILE ROLE:
 * Verifies Paystack webhooks and queues event processing.
 *
 * CONNECTS TO:
 * - services/paystackWebhookService.js
 * - models/PaystackWebhookEvent
 *
 * USED BY:
 * - POST /api/paystack/webhook
 *
 * NOTES:
 * - Stores raw events for idempotency and auditing.
 */
