const {
  previewUnlockSingle,
  previewUnlockAll,
  confirmUnlockSingle,
  confirmUnlockAll,
} = require("../services/unlockService");
const {
  getIdempotencyKey,
  getIdempotentResult,
  recordIdempotentResult,
} = require("../services/idempotencyService");
const { createDecision, markExecuted, markFailed } = require("../services/decisionService");

const preview = async (req, res) => {
  try {
    const { mode, depositId, useEmergency } = req.body || {};
    if (mode === "all") {
      const result = await previewUnlockAll({ userId: req.user.id, useEmergency });
      return res.status(200).json({ ok: true, preview: result });
    }

    const result = await previewUnlockSingle({
      userId: req.user.id,
      depositId,
      useEmergency,
    });
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

    const { mode, depositId, useEmergency, recipient } = req.body || {};
    decision = await createDecision({
      userId: req.user.id,
      type: "UNLOCK_CONFIRM",
      idempotencyKey,
      request: { mode, depositId, useEmergency, recipient },
    });
    if (mode === "all") {
      const result = await confirmUnlockAll({
        userId: req.user.id,
        useEmergency,
        recipient,
      });
      const response = { ok: true, result };
      await markExecuted(decision._id, response);
      await recordIdempotentResult({
        key: idempotencyKey,
        userId: req.user.id,
        endpoint: req.originalUrl,
        method: req.method,
        statusCode: 200,
        response,
      });
      return res.status(200).json(response);
    }

    const result = await confirmUnlockSingle({
      userId: req.user.id,
      depositId,
      useEmergency,
      recipient,
    });
    const response = { ok: true, result };
    await markExecuted(decision._id, response);
    await recordIdempotentResult({
      key: idempotencyKey,
      userId: req.user.id,
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: 200,
      response,
    });
    return res.status(200).json(response);
  } catch (error) {
    if (decision) {
      await markFailed(decision._id, error.message);
    }
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  preview,
  confirm,
};

/**
 * FILE ROLE:
 * Exposes early unlock preview/confirm for Mode A (single) and Mode B (all).
 *
 * CONNECTS TO:
 * - services/unlockService.js
 *
 * USED BY:
 * - routes/unlockRoutes.js
 *
 * NOTES:
 * - Enforces emergency unlock limits and penalty pool behavior.
 */
