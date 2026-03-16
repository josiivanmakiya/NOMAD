const formatDate = (timestamp) => {
  const date = new Date(timestamp || Date.now());
  if (Number.isNaN(date.getTime())) {
    return "unknown-date";
  }
  return date.toISOString().slice(0, 10);
};

/**
 * Transforms raw DB events into a clean narrative for the LLM.
 * @param {Array} events - List of EventLog documents
 * @returns {String} - Token-optimized context string
 */
const serializeHistoryForAI = (events) => {
  if (!Array.isArray(events) || events.length === 0) {
    return "No history available.";
  }

  return events
    .slice()
    .sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0))
    .map((event) => {
      const date = formatDate(event.timestamp);
      const metadata = event.metadata || {};

      switch (event.action) {
        case "DEPOSIT_LOCKED":
          return `[${date}] User locked $${metadata.amount ?? 0} for ${metadata.lockDurationDays ?? "?"} days.`;
        case "EARLY_BREACH_ATTEMPT":
          return `[${date}] User attempted to break lock on $${metadata.amount ?? 0}.`;
        case "EARLY_BREACH_CONFIRMED":
          return `[${date}] User broke lock. Penalty: $${metadata.penaltyIncurred ?? 0}.`;
        case "DEPOSIT_CREATED":
          return `[${date}] User started a new deposit of $${metadata.amount ?? 0}.`;
        case "MATURITY_WITHDRAWAL":
          return `[${date}] User withdrew matured funds of $${metadata.amount ?? 0}.`;
        case "VIEWED_LOCKED_FUNDS":
          return `[${date}] User checked locked funds.`;
        default:
          return `[${date}] ${event.action || "UNKNOWN_ACTION"}`;
      }
    })
    .join("\n");
};

module.exports = {
  serializeHistoryForAI,
};
