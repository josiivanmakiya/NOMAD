import { createContext, useContext, useMemo, useState } from "react";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [toneMode, setToneMode] = useState("calm");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const value = useMemo(
    () => ({
      toneMode,
      setToneMode,
      isLoading,
      setIsLoading,
      notification,
      setNotification
    }),
    [toneMode, isLoading, notification]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  return useContext(UiContext);
}

/**
 * FILE ROLE:
 * Holds UI tone mode and transient notification state.
 *
 * CONNECTS TO:
 * - pages/SettingsPage.jsx
 *
 * USED BY:
 * - pages/SettingsPage.jsx
 */
