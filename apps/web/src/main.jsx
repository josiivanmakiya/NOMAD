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
                  <HistoryProvider>
                    <App />
                  </HistoryProvider>
                </DepositProvider>
              </DashboardProvider>
            </AccountProvider>
          </CurrencyProvider>
        </AuthProvider>
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
