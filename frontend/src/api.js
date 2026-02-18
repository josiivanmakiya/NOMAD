const normalizeApiBaseUrl = (value) => {
  if (value === undefined || value === null) return "http://localhost:5000";
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "/") return "";
  return trimmed.replace(/\/+$/, "");
};

const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
const founderAdminKey = import.meta.env.VITE_FOUNDER_ADMIN_KEY || "";

const buildApiBaseCandidates = () => {
  if (apiBaseUrl === "") {
    return [""];
  }
  const candidates = [apiBaseUrl, "http://localhost:5000", "http://localhost:5001", "http://localhost:5002"];
  return [...new Set(candidates.filter(Boolean))];
};

const apiBaseCandidates = buildApiBaseCandidates();

const getUserId = () => {
  const stored = localStorage.getItem("NOMADUserId");
  if (stored) return stored;
  return "";
};

const fetchJson = async (path, options = {}) => {
  const method = String(options.method || "GET").toUpperCase();
  const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const existingIdempotencyKey =
    options.headers?.["x-idempotency-key"] || options.headers?.["idempotency-key"];
  const idempotencyKey =
    existingIdempotencyKey ||
    (isWrite
      ? `ui_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
      : undefined);

  const userId = getUserId();
  const headers = {
    "Content-Type": "application/json",
    ...(userId ? { "x-user-id": userId } : {}),
    "x-currency": localStorage.getItem("NOMADCurrency") || "NGN",
    ...(idempotencyKey ? { "x-idempotency-key": idempotencyKey } : {}),
    ...options.headers
  };

  let response;
  let networkError = null;

  for (const baseUrl of apiBaseCandidates) {
    try {
      response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
      });
      break;
    } catch (error) {
      networkError = error;
    }
  }

  if (!response) {
    if (path.startsWith("/api/genesis/") || path.startsWith("/api/waitlist")) {
      throw new Error("Cannot reach waitlist service. Start backend and confirm VITE_API_BASE_URL.");
    }
    throw new Error("Cannot reach backend. Start backend server and confirm VITE_API_BASE_URL.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.message || "Request failed.";
    throw new Error(message);
  }

  return data;
};

export const getDashboardSummary = () => fetchJson("/api/dashboard/summary");

export const previewDeposit = (amount, durationDays) =>
  fetchJson("/api/deposits/preview", {
    method: "POST",
    body: JSON.stringify({ amount, durationDays })
  });

export const confirmDeposit = (amount, options = {}) =>
  fetchJson("/api/deposits/confirm", {
    method: "POST",
    body: JSON.stringify({
      amount,
      durationDays: options.durationDays,
      fundingReference: options.fundingReference
    })
  });

export const getDeposits = () => fetchJson("/api/deposits");

export const previewRelease = (depositId) =>
  fetchJson(`/api/releases/${depositId}/preview`);

export const confirmRelease = (depositId, recipient) =>
  fetchJson(`/api/releases/${depositId}/confirm`, {
    method: "POST",
    body: JSON.stringify({ recipient })
  });

export const previewUnlock = ({ mode, depositId, useEmergency }) =>
  fetchJson("/api/unlocks/preview", {
    method: "POST",
    body: JSON.stringify({ mode, depositId, useEmergency })
  });

export const confirmUnlock = ({ mode, depositId, useEmergency, recipient }) =>
  fetchJson("/api/unlocks/confirm", {
    method: "POST",
    body: JSON.stringify({ mode, depositId, useEmergency, recipient })
  });

export const getActiveRules = async () => {
  try {
    return await fetchJson("/api/rules/active");
  } catch (error) {
    return fetchJson("/api/rules/current");
  }
};

export const getHistory = () => fetchJson("/api/history");

export const verifyBankAccount = ({ accountNumber, bankCode, accountName }) =>
  fetchJson("/api/payments/verify-account", {
    method: "POST",
    body: JSON.stringify({ accountNumber, bankCode, accountName })
  });

export const listLinkedAccounts = () => fetchJson("/api/accounts");

export const linkLinkedAccount = ({ bankCode, bankName, accountNumber, accountName }) =>
  fetchJson("/api/accounts/link", {
    method: "POST",
    body: JSON.stringify({ bankCode, bankName, accountNumber, accountName })
  });

export const deleteLinkedAccount = (accountId) =>
  fetchJson(`/api/accounts/${accountId}`, {
    method: "DELETE"
  });

export const listRecurringProtocols = () => fetchJson("/api/protocols");

export const createRecurringProtocol = ({
  authCode,
  userEmail,
  amount,
  currency = "NGN",
  frequency,
  provider = "paystack",
  isAutoRelockEnabled = false,
}) =>
  fetchJson("/api/protocols", {
    method: "POST",
    body: JSON.stringify({
      authCode,
      userEmail,
      amount,
      currency,
      frequency,
      provider,
      isAutoRelockEnabled,
    }),
  });

export const pauseRecurringProtocol = (protocolId) =>
  fetchJson(`/api/protocols/${protocolId}/pause`, { method: "POST" });

export const resumeRecurringProtocol = (protocolId) =>
  fetchJson(`/api/protocols/${protocolId}/resume`, { method: "POST" });

export const cancelRecurringProtocol = (protocolId) =>
  fetchJson(`/api/protocols/${protocolId}/cancel`, { method: "POST" });

export const getRecurringRecommendation = () =>
  fetchJson("/api/protocols/recommendation/cost");

export const listDynastyLocks = () => fetchJson("/api/dynasty");

export const createDynastyLock = ({
  beneficiaryName,
  beneficiaryDOB,
  targetAge,
  amount,
}) =>
  fetchJson("/api/dynasty", {
    method: "POST",
    body: JSON.stringify({
      beneficiaryName,
      beneficiaryDOB,
      targetAge,
      amount,
    }),
  });

export const setDynastyIrrevocable = (legacyLockId) =>
  fetchJson(`/api/dynasty/${legacyLockId}/irrevocable`, {
    method: "POST",
  });

export const getDynastyReadiness = (legacyLockId) =>
  fetchJson(`/api/dynasty/${legacyLockId}/readiness`);

export const signupUser = ({
  name,
  businessName = "",
  email,
  phoneNumber,
  userType = "individual",
}) =>
  fetchJson("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, businessName, email, phoneNumber, userType }),
  });

export const loginUser = ({ email }) =>
  fetchJson("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const verifyIdentity = ({ provider, verifiedName }) =>
  fetchJson("/api/identity/verify", {
    method: "POST",
    body: JSON.stringify({ provider, verifiedName }),
  });

export const sendOtp = ({ phoneNumber }) =>
  fetchJson("/api/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });

export const verifyOtp = ({ phoneNumber, otp, pin, password }) =>
  fetchJson("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, otp, pin, password }),
  });

export const getAuthMe = () => fetchJson("/api/auth/me");

export const getGenesisSummary = () => fetchJson("/api/genesis/summary");

export const getGenesisBriefings = () => fetchJson("/api/genesis/briefings");

export const joinGenesisWaitlist = ({
  email,
  phoneNumber,
  biggestLeak,
  leakRange,
  tenYearGoal,
  resetConsent,
  automation,
}) =>
  fetchJson("/api/waitlist", {
    method: "POST",
    body: JSON.stringify({
      email,
      phoneNumber,
      biggestLeak,
      leakRange,
      tenYearGoal,
      resetConsent,
      automation,
    }),
  });

export const getGenesisAdminUsers = () => fetchJson("/api/genesis/admin/users");

export const getFounderDashboardUsers = () =>
  fetchJson("/api/founder/users", {
    headers: founderAdminKey ? { "x-admin-key": founderAdminKey } : {},
  });

export const getFounderWaitlistLogs = (limit = 50) =>
  fetchJson(`/api/founder/waitlist-logs?limit=${encodeURIComponent(limit)}`, {
    headers: founderAdminKey ? { "x-admin-key": founderAdminKey } : {},
  });

export const getFounderWaitlistEntries = (limit = 200) =>
  fetchJson(`/api/founder/waitlist?limit=${encodeURIComponent(limit)}`, {
    headers: founderAdminKey ? { "x-admin-key": founderAdminKey } : {},
  });

export const getMyGenesisAudits = () => fetchJson("/api/genesis/audits/me");

export const submitGenesisAudit = ({ weekOf, frictionCheck, impulseCheck, insightValue, notes }) =>
  fetchJson("/api/genesis/audits", {
    method: "POST",
    body: JSON.stringify({ weekOf, frictionCheck, impulseCheck, insightValue, notes }),
  });

export const publicNomadChat = ({ message }) =>
  fetchJson("/api/nomad/public-chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

export const getDisciplineProfile = () => fetchJson("/api/discipline/me");

export const getDisciplineTiers = () => fetchJson("/api/discipline/tiers");

/**
 * FILE ROLE:
 * Client-side API wrapper for NOMAD backend endpoints.
 *
 * CONNECTS TO:
 * - backend routes under /api/*
 *
 * USED BY:
 * - pages/* (Deposit, Release, Dashboard, etc.)
 * - state/DashboardContext.jsx
 *
 * NOTES:
 * - Injects x-user-id and x-currency headers for pre-production auth.
 */


