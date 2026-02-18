import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import { AuthProvider } from "./state/AuthContext.jsx";
import { AccountProvider } from "./state/AccountContext.jsx";
import { DashboardProvider } from "./state/DashboardContext.jsx";
import { DepositProvider } from "./state/DepositContext.jsx";
import { UiProvider } from "./state/UiContext.jsx";
import { CurrencyProvider } from "./state/CurrencyContext.jsx";
import { LockProvider } from "./state/LockContext.jsx";
import { HistoryProvider } from "./state/HistoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UiProvider>
        <AuthProvider>
          <CurrencyProvider>
            <AccountProvider>
              <DashboardProvider>
                <DepositProvider>
                  <LockProvider>
                    <HistoryProvider>
                      <App />
                    </HistoryProvider>
                  </LockProvider>
                </DepositProvider>
              </DashboardProvider>
            </AccountProvider>
          </CurrencyProvider>
        </AuthProvider>
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * FILE ROLE:
 * React entrypoint that mounts providers and routing.
 *
 * CONNECTS TO:
 * - src/App.jsx
 * - state/*Context.jsx providers
 * - styles.css
 *
 * USED BY:
 * - index.html
 */
