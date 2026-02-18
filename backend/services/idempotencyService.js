const IdempotencyKey = require("../models/IdempotencyKey");

const getIdempotencyKey = (req) => {
  return req?.headers?.["x-idempotency-key"] || req?.headers?.["idempotency-key"] || null;
};

const getIdempotentResult = async ({ key, userId, endpoint, method }) => {
  if (!key) return null;
  return IdempotencyKey.findOne({ key, userId, endpoint, method }).lean();
};

const recordIdempotentResult = async ({
  key,
  userId,
  endpoint,
  method,
  statusCode,
  response,
}) => {
  if (!key) return null;
  return IdempotencyKey.findOneAndUpdate(
    { key, userId, endpoint, method },
    {
      $setOnInsert: {
        statusCode,
        response,
      },
    },
    { upsert: true, new: true }
  );
};

module.exports = {
  getIdempotencyKey,
  recordIdempotentResult,
  getIdempotentResult,
};

/**
 * FILE ROLE:
 * Idempotency storage for confirm-style endpoints.
 *
 * CONNECTS TO:
 * - models/IdempotencyKey
 *
 * USED BY:
 * - controllers/depositController.js
 * - controllers/releaseController.js
 * - controllers/unlockController.js
 *
 * NOTES:
 * - Stores successful responses keyed by idempotency-key + user + endpoint.
 */
