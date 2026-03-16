const { previewDeposit, confirmDeposit, listDeposits } = require("../services/depositService");
const {
  getIdempotencyKey,
  getIdempotentResult,
  recordIdempotentResult,
} = require("../services/idempotencyService");
const { createDecision, markExecuted, markFailed } = require("../services/decisionService");

const preview = async (req, res) => {
  try {
    const { amount, durationDays } = req.body;
    const result = await previewDeposit(req.user.id, amount, { durationDays });
    return res.status(200).json({ ok: true, preview: result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const confirm = async (req, res) => {
  let decision = null;
  try {
    const idempotencyKey = getIdempotencyKey(req);
    if (idempotencyKey) {
      const cached = await getIdempotentResult({
        key: idempotencyKey,
        userId: req.user.id,
        endpoint: req.originalUrl,
        method: req.method,
      });
      if (cached) {
        return res.status(cached.statusCode || 200).json(cached.response);
      }
    }

    const { amount, durationDays, fundingReference } = req.body;
    const currency = req.headers["x-currency"];
    decision = await createDecision({
      userId: req.user.id,
      type: "DEPOSIT_CONFIRM",
      idempotencyKey,
      request: { amount, durationDays, fundingReference, currency },
    });
    const result = await confirmDeposit(req.user.id, amount, {
      durationDays,
      fundingReference,
      currency,
    });
    const response = { ok: true, result };
    await markExecuted(decision._id, response);
    await recordIdempotentResult({
      key: idempotencyKey,
      userId: req.user.id,
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: 201,
      response,
    });
    return res.status(201).json(response);
  } catch (error) {
    if (decision) {
      await markFailed(decision._id, error.message);
    }
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const deposits = await listDeposits(req.user.id);
    return res.status(200).json({ ok: true, deposits });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  preview,
  confirm,
  list,
};

/**
 * FILE ROLE:
 * HTTP controller for deposit preview/confirm/list.
 *
 * CONNECTS TO:
 * - services/depositService.js (business logic)
 *
 * USED BY:
 * - routes/depositRoutes.js
 *
 * NOTES:
 * - Reads currency from request headers.
 * - Funding verification is enforced server-side.
 */
