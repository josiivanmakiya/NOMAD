const Decision = require("../models/Decision");

const createDecision = async ({ userId, type, idempotencyKey, request }) => {
  return Decision.create({
    userId,
    type,
    status: "REQUESTED",
    idempotencyKey: idempotencyKey || "",
    request: request || {},
  });
};

const markExecuted = async (decisionId, response) => {
  return Decision.findByIdAndUpdate(
    decisionId,
    { status: "EXECUTED", response: response || {}, error: "" },
    { new: true }
  );
};

const markFailed = async (decisionId, error) => {
  return Decision.findByIdAndUpdate(
    decisionId,
    { status: "FAILED", error: String(error || "") },
    { new: true }
  );
};

module.exports = {
  createDecision,
  markExecuted,
  markFailed,
};

/**
 * FILE ROLE:
 * Persists decision records for confirm actions (auditable trail).
 *
 * CONNECTS TO:
 * - models/Decision
 *
 * USED BY:
 * - controllers/* confirm handlers
 */
