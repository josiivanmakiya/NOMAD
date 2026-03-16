import { fetchJsonWithAdminKey } from "./internalFetch.js";

export const getAdminUsers = () => fetchJsonWithAdminKey("/api/admin/users");

export const getAdminWaitlistLogs = (limit = 50) =>
  fetchJsonWithAdminKey(`/api/admin/waitlist-logs?limit=${encodeURIComponent(limit)}`);

/**
 * FILE ROLE:
 * Admin-only API client methods.
 *
 * CONNECTS TO:
 * - backend /api/admin/*
 *
 * USED BY:
 * - pages/admin/FounderDashboardPage.jsx
 */
