const { previewRelease, confirmRelease } = require("../services/releaseService");
const {
  getIdempotencyKey,
  getIdempotentResult,
  recordIdempotentResult,
} = require("../services/idempotencyService");
const { createDecision, markExecuted, markFailed } = require("../services/decisionService");

const preview = async (req, res) => {
  try {
    const { depositId } = req.params;
    const result = await previewRelease(req.user.id, depositId);
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

    const { depositId } = req.params;
    const { recipient } = req.body || {};
    decision = await createDecision({
      userId: req.user.id,
      type: "RELEASE_CONFIRM",
      idempotencyKey,
      request: { depositId, recipient },
    });
    const result = await confirmRelease(req.user.id, depositId, { recipient });
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
 * Handles release preview/confirm for matured deposits only.
 *
 * CONNECTS TO:
 * - services/releaseService.js (matured release logic)
 *
 * USED BY:
 * - routes/releaseRoutes.js
 *
 * NOTES:
 * - Early unlocks are handled by unlockController instead.
 */
