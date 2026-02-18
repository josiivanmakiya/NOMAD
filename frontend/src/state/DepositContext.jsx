import { createContext, useContext, useMemo, useState } from "react";

const DepositContext = createContext(null);

export function DepositProvider({ children }) {
  const [depositPreview, setDepositPreview] = useState(null);
  const [depositResult, setDepositResult] = useState(null);

  const clearDeposit = () => {
    setDepositPreview(null);
    setDepositResult(null);
  };

  const value = useMemo(
    () => ({
      depositPreview,
      setDepositPreview,
      depositResult,
      setDepositResult,
      clearDeposit
    }),
    [depositPreview, depositResult]
  );

  return <DepositContext.Provider value={value}>{children}</DepositContext.Provider>;
}

export function useDeposit() {
  return useContext(DepositContext);
}

/**
 * FILE ROLE:
 * Stores transient deposit preview and confirmation state.
 *
 * CONNECTS TO:
 * - pages/DepositPage.jsx
 *
 * USED BY:
 * - pages/DepositPage.jsx
 */
