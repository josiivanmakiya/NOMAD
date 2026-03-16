const { NOMAD_INSIGHT_SYSTEM_PROMPT } = require("../config/aiPrompts");

const DEFAULT_AI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_MAX_TOKENS = 220;

const summarizeHistory = (history = []) => {
  const deposits = history.filter((e) => e.type === "DEPOSIT_IN").length;
  const releases = history.filter((e) => e.type === "RELEASED").length;
  const lockResets = history.filter((e) => e.type === "LOCK_RESET").length;
  const frictionEvents = history.filter(
    (e) => e.type === "FRICTION_FEE_APPLIED" || (e.type === "LOCK_RESET" && Number(e.amountMinor || 0) > 0)
  );
  const frictionMinor = frictionEvents.reduce((sum, event) => sum + Math.max(0, Number(event.amountMinor || 0)), 0);

  return {
    eventCount: history.length,
    deposits,
    releases,
    lockResets,
    frictionMinor,
  };
};

const sanitizeReply = (text) => {
  const raw = String(text || "");
  return raw
    .replace(/as an ai language model[:,]?/gi, "")
    .replace(/i (can't|cannot) provide financial advice[:,]?/gi, "I do not provide financial advice.")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .trim();
};

const User = require("../models/User");

const maskProviderError = async (response) => {
  const responseText = await response.text();
  const lower = responseText.toLowerCase();

  if (response.status === 429) {
    return "Terminal Busy. Discipline requires patience. Try again in 10 minutes.";
  }

  if (lower.includes("context") && (lower.includes("length") || lower.includes("window"))) {
    return "Protocol History too long. Summary initiated. Ask your question again briefly.";
  }

  return "Guide channel unavailable. Keep lock protocol active and retry shortly.";
};

const chat = async (req, res) => {
  try {
    const { message, history = [], currentLocks = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ ok: false, message: "Message is required." });
    }

    const apiKey = process.env.NOMAD_AI_API_KEY || process.env.OPENAI_API_KEY;
    const apiUrl = process.env.NOMAD_AI_URL || DEFAULT_AI_URL;
    const model = process.env.NOMAD_AI_MODEL || DEFAULT_MODEL;
    const maxTokens = Number(process.env.NOMAD_AI_MAX_TOKENS || DEFAULT_MAX_TOKENS);

    if (!apiKey) {
      return res.status(500).json({ ok: false, message: "AI provider is not configured." });
    }

    const historySummary = summarizeHistory(history);
    const user = await User.findById(req.user.id)
      .select("metrics protocolSettings")
      .lean();
    const userMetrics = user?.metrics || {};
    const protocolSettings = user?.protocolSettings || {};
    const lockSummary = (currentLocks || []).map((lock) => ({
      amount: lock.amount || 0,
      maturesAt: lock.maturesAt || null,
      status: lock.status || "unknown",
    }));

    const payload = {
      model,
      messages: [
        {
          role: "system",
          content: NOMAD_INSIGHT_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `User query: "${message}"\nContext summary: ${JSON.stringify({
            historySummary,
            lockSummary,
            userMetrics,
            protocolSettings,
          })}`,
        },
      ],
      temperature: 0.2,
      max_tokens: Number.isFinite(maxTokens) ? maxTokens : DEFAULT_MAX_TOKENS,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const masked = await maskProviderError(response);
      return res.status(200).json({ ok: true, mode: "real", reply: masked });
    }

    const data = await response.json();
    const rawReply =
      data?.choices?.[0]?.message?.content ||
      "No response from provider.";
    let reply = sanitizeReply(rawReply) || "Response unavailable. Retry with a shorter question.";
    if (Number(userMetrics.failedUnlockAttempts || 0) > 3) {
      reply = `${reply}\nNomad Insight note: repeated early-unlock attempts indicate high impulse risk. Respect friction and wait for maturity.`;
    }

    return res.status(200).json({ ok: true, mode: "real", reply });
  } catch (error) {
    return res.status(200).json({
      ok: true,
      mode: "real",
      reply: "Guide channel unavailable. Keep lock protocol active and retry shortly.",
    });
  }
};

const publicChat = async (req, res) => {
  try {
    const { message, systemPrompt } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ ok: false, message: "Message is required." });
    }

    const apiKey = process.env.NOMAD_AI_API_KEY || process.env.OPENAI_API_KEY;
    const apiUrl = process.env.NOMAD_AI_URL || DEFAULT_AI_URL;
    const model = process.env.NOMAD_AI_MODEL || DEFAULT_MODEL;
    const maxTokens = Number(process.env.NOMAD_AI_MAX_TOKENS || DEFAULT_MAX_TOKENS);

    if (!apiKey) {
      return res.status(500).json({ ok: false, message: "AI provider is not configured." });
    }

    const resolvedSystemPrompt =
      typeof systemPrompt === "string" && systemPrompt.trim().length > 0
        ? systemPrompt.trim()
        : "You are NOMAD Insight (public mode). Answer only personal finance topics: budgeting, saving, debt, emergency funds, risk basics, and disciplined spending. Avoid legal/tax/investment guarantees. Keep answers concise and practical.";

    const payload = {
      model,
      messages: [
        {
          role: "system",
          content: resolvedSystemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.2,
      max_tokens: Number.isFinite(maxTokens) ? maxTokens : DEFAULT_MAX_TOKENS,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const masked = await maskProviderError(response);
      return res.status(200).json({ ok: true, mode: "real", reply: masked });
    }

    const data = await response.json();
    const rawReply =
      data?.choices?.[0]?.message?.content ||
      "No response from provider.";
    const reply = sanitizeReply(rawReply) || "Response unavailable. Retry with a shorter question.";

    return res.status(200).json({ ok: true, mode: "real", reply });
  } catch (_error) {
    return res.status(200).json({
      ok: true,
      mode: "real",
      reply: "Guide channel unavailable. Try again shortly.",
    });
  }
};

module.exports = {
  chat,
  publicChat,
};

/**
 * FILE ROLE:
 * NOMAD chat proxy.
 *
 * CONNECTS TO:
 * - routes/nomadRoutes.js
 */
