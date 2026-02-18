const EventLog = require("../models/EventLog");
const { serializeHistoryForAI } = require("../utils/aiContextBuilder");
const { INSIGHT_SYSTEM_PROMPT } = require("../config/aiPrompts");

const MAX_EVENTS = 20;

const getUserContext = async (userId) => {
  if (!userId) {
    throw new Error("User is required.");
  }

  const history = await EventLog.find({ userId })
    .sort({ timestamp: -1 })
    .limit(MAX_EVENTS)
    .lean();

  return serializeHistoryForAI(history);
};

const generateBehavioralInsight = async (userId) => {
  const context = await getUserContext(userId);

  // Future integration point:
  // const prompt = `${INSIGHT_SYSTEM_PROMPT}\n${context}`;
  // const modelResponse = await callLLM(prompt);

  return {
    type: "OBSERVATION",
    content:
      "You have successfully locked funds multiple times, and tend to review locked balances shortly after new locks.",
    pattern: "post-lock checking behavior",
    confidence: 0.9,
    context,
    promptVersion: INSIGHT_SYSTEM_PROMPT,
  };
};

module.exports = {
  getUserContext,
  generateBehavioralInsight,
};
