const { serializeHistoryForAI } = require("../utils/aiContextBuilder");
const { NOMAD_INSIGHT_SYSTEM_PROMPT } = require("../config/aiPrompts");

const buildAIGuidePayload = ({ history = [], currentLocks = [], userQuery = "" }) => {
  const historyNarrative = serializeHistoryForAI(history);
  const locks = currentLocks.map((lock) => ({
    id: String(lock._id),
    amount: lock.amount,
    maturesAt: lock.maturesAt,
    status: lock.status,
  }));

  return {
    systemPrompt: NOMAD_INSIGHT_SYSTEM_PROMPT,
    userQuery,
    context: {
      historyNarrative,
      currentLocks: locks,
    },
  };
};

module.exports = {
  buildAIGuidePayload,
};
