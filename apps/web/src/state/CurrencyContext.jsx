import { createContext, useContext, useMemo, useState } from "react";
import { defaultCurrency, supportedCurrencies } from "../utils/currency.js";

const CurrencyContext = createContext(null);

const getStoredCurrency = () => {
  try {
    const stored = localStorage.getItem("delayCurrency");
    if (stored && supportedCurrencies.includes(stored)) {
      return stored;
    }
  } catch {
    return defaultCurrency;
  }
  return defaultCurrency;
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(getStoredCurrency());

  const setCurrencySafe = (nextCurrency) => {
    const value = supportedCurrencies.includes(nextCurrency)
      ? nextCurrency
      : defaultCurrency;
    try {
      localStorage.setItem("delayCurrency", value);
    } catch {
      // Ignore storage failures in local-only mode.
    }
    setCurrency(value);
  };

  const value = useMemo(
    () => ({
      currency,
      setCurrency: setCurrencySafe,
      supportedCurrencies,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/**
 * FILE ROLE:
 * Manages selected display currency for UI formatting.
 *
 * CONNECTS TO:
 * - utils/currency.js
 * - localStorage
 *
 * USED BY:
 * - pages/DashboardPage.jsx
 * - pages/DepositPage.jsx
 * - pages/DepositsListPage.jsx
 * - pages/DepositDetailPage.jsx
 * - pages/ReleaseDecisionPage.jsx
 * - pages/SettingsPage.jsx
 */
