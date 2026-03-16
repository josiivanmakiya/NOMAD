const normalizeApiBaseUrl = (value) => {
  if (value === undefined || value === null) return "http://localhost:5000";
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "/") return "";
  return trimmed.replace(/\/+$/, "");
};

const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

const getUserId = () => localStorage.getItem("NOMADUserId") || "";

const fetchJson = async (path, options = {}) => {
  const method = String(options.method || "GET").toUpperCase();
  const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const idempotencyKey = isWrite
    ? `ui_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    : undefined;
  const userId = getUserId();
  const headers = {
    "Content-Type": "application/json",
    ...(userId ? { "x-user-id": userId } : {}),
    "x-currency": localStorage.getItem("NOMADCurrency") || "NGN",
    ...(idempotencyKey ? { "x-idempotency-key": idempotencyKey } : {}),
    ...options.headers,
  };
  const base = apiBaseUrl || "http://localhost:5000";
  const response = await fetch(`${base}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
};

export const getDashboardSummary = () => fetchJson("/api/dashboard/summary");
export const getDeposits = () => fetchJson("/api/deposits");
export const previewDeposit = (amount, durationDays) => fetchJson("/api/deposits/preview", { method: "POST", body: JSON.stringify({ amount, durationDays }) });
export const confirmDeposit = (amount, options = {}) => fetchJson("/api/deposits/confirm", { method: "POST", body: JSON.stringify({ amount, durationDays: options.durationDays, fundingReference: options.fundingReference }) });
export const previewRelease = (depositId) => fetchJson(`/api/releases/${depositId}/preview`);
export const confirmRelease = (depositId, recipient) => fetchJson(`/api/releases/${depositId}/confirm`, { method: "POST", body: JSON.stringify({ recipient }) });
export const previewUnlock = ({ mode, depositId, useEmergency }) => fetchJson("/api/unlocks/preview", { method: "POST", body: JSON.stringify({ mode, depositId, useEmergency }) });
export const confirmUnlock = ({ mode, depositId, useEmergency, recipient }) => fetchJson("/api/unlocks/confirm", { method: "POST", body: JSON.stringify({ mode, depositId, useEmergency, recipient }) });
export const getActiveRules = async () => { try { return await fetchJson("/api/rules/active"); } catch (_) { return fetchJson("/api/rules/current"); } };
export const getHistory = () => fetchJson("/api/history");
export const verifyBankAccount = ({ accountNumber, bankCode, accountName }) => fetchJson("/api/payments/verify-account", { method: "POST", body: JSON.stringify({ accountNumber, bankCode, accountName }) });
export const listLinkedAccounts = () => fetchJson("/api/accounts");
export const linkLinkedAccount = ({ bankCode, bankName, accountNumber, accountName }) => fetchJson("/api/accounts/link", { method: "POST", body: JSON.stringify({ bankCode, bankName, accountNumber, accountName }) });
export const deleteLinkedAccount = (accountId) => fetchJson(`/api/accounts/${accountId}`, { method: "DELETE" });
export const signupUser = ({ name, businessName = "", email, phoneNumber, userType = "individual" }) => fetchJson("/api/auth/signup", { method: "POST", body: JSON.stringify({ name, businessName, email, phoneNumber, userType }) });
export const loginUser = ({ email }) => fetchJson("/api/auth/login", { method: "POST", body: JSON.stringify({ email }) });
export const verifyIdentity = ({ provider, verifiedName }) => fetchJson("/api/identity/verify", { method: "POST", body: JSON.stringify({ provider, verifiedName }) });
export const sendOtp = ({ phoneNumber }) => fetchJson("/api/auth/send-otp", { method: "POST", body: JSON.stringify({ phoneNumber }) });
export const verifyOtp = ({ phoneNumber, otp, pin, password }) => fetchJson("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ phoneNumber, otp, pin, password }) });
export const getAuthMe = () => fetchJson("/api/auth/me");
export const getGenesisSummary = () => fetchJson("/api/genesis/summary");
export const getGenesisBriefings = () => fetchJson("/api/genesis/briefings");
export const getGenesisAdminUsers = () => fetchJson("/api/genesis/admin/users");
export const getFounderDashboardUsers = () => fetchJson("/api/founder/users");
export const getFounderWaitlistLogs = (limit = 50) => fetchJson(`/api/founder/waitlist-logs?limit=${encodeURIComponent(limit)}`);
export const getFounderWaitlistEntries = (limit = 200) => fetchJson(`/api/founder/waitlist?limit=${encodeURIComponent(limit)}`);
export const getMyGenesisAudits = () => fetchJson("/api/genesis/audits/me");
export const submitGenesisAudit = ({ weekOf, frictionCheck, impulseCheck, insightValue, notes }) => fetchJson("/api/genesis/audits", { method: "POST", body: JSON.stringify({ weekOf, frictionCheck, impulseCheck, insightValue, notes }) });
export const publicNomadChat = ({ message, systemPrompt }) => fetchJson("/api/nomad/public-chat", { method: "POST", body: JSON.stringify({ message, systemPrompt }) });
export const getDisciplineProfile = () => fetchJson("/api/discipline/me");
export const getDisciplineTiers = () => fetchJson("/api/discipline/tiers");
