import { createContext, useContext, useEffect, useState } from "react";
import { getHistory } from "../api.js";

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [ledgerEvents, setLedgerEvents] = useState([]);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadHistory = async () => {
      try {
        const response = await getHistory();
        const history = Array.isArray(response.history) ? response.history : [];
        const normalized = history.map((entry) => ({
          id: entry.id,
          timestamp: entry.date,
          type: entry.type,
          amountMinor: Math.round(Number(entry.amount || 0) * 100),
          currency: entry.currency || "NGN",
          balanceAfterMinor: 0,
          description: entry.description || "",
          metadata: entry.metadata || {},
        }));
        if (!cancelled) {
          setLedgerEvents(normalized);
          setHistoryError("");
        }
      } catch (error) {
        if (!cancelled) {
          setLedgerEvents([]);
          setHistoryError(error.message || "Could not load history.");
        }
      }
    };
    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HistoryContext.Provider value={{ ledgerEvents, historyError }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within HistoryProvider");
  }
  return context;
}

/**
 * FILE ROLE:
 * Read-only history source from backend ledger.
 */
