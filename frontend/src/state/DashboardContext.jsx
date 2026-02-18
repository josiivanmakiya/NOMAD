import { createContext, useContext, useMemo, useState } from "react";
import { getDashboardSummary } from "../api";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [summary, setSummary] = useState(null);

  const refresh = async () => {
    const data = await getDashboardSummary();
    setSummary(data.summary);
  };

  const value = useMemo(
    () => ({ summary, refresh }),
    [summary]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  return useContext(DashboardContext);
}

/**
 * FILE ROLE:
 * Manages dashboard summary state from the backend.
 *
 * CONNECTS TO:
 * - api.js (getDashboardSummary)
 *
 * USED BY:
 * - pages/DashboardPage.jsx
 */
