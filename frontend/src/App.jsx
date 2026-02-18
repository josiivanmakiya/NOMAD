import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import WhyNomadPage from "./pages/WhyNomadPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import TimeLawsPage from "./pages/TimeLawsPage.jsx";
import AiPermissionsPage from "./pages/AiPermissionsPage.jsx";
import HistorySpecPage from "./pages/HistorySpecPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import FastEntryPage from "./pages/FastEntryPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PinCreatePage from "./pages/PinCreatePage.jsx";
import PinConfirmPage from "./pages/PinConfirmPage.jsx";
import VerifyIdentityPage from "./pages/VerifyIdentityPage.jsx";
import ConnectBankPage from "./pages/ConnectBankPage.jsx";
import AppLayout from "./components/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SafeHomePage from "./pages/SafeHomePage.jsx";
import DepositPage from "./pages/DepositPage.jsx";
import DepositsListPage from "./pages/DepositsListPage.jsx";
import DepositDetailPage from "./pages/DepositDetailPage.jsx";
import ReleaseDecisionPage from "./pages/ReleaseDecisionPage.jsx";
import RelockConfirmPage from "./pages/RelockConfirmPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AccountsPage from "./pages/AccountsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LocksListPage from "./pages/LocksListPage.jsx";
import LockDetailPage from "./pages/LockDetailPage.jsx";
import LockBreachPage from "./pages/LockBreachPage.jsx";
import LockRelockPage from "./pages/LockRelockPage.jsx";
import BalancesPage from "./pages/BalancesPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import AuditPage from "./pages/AuditPage.jsx";
import VaultPage from "./pages/VaultPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";
import ValuesPage from "./pages/ValuesPage.jsx";
import RecurringProtocolsPage from "./pages/RecurringProtocolsPage.jsx";
import ProtocolPage from "./pages/ProtocolPage.jsx";
import NomadCardPage from "./pages/NomadCardPage.jsx";
import DynastyPage from "./pages/DynastyPage.jsx";
import TaxEfficiencyPage from "./pages/TaxEfficiencyPage.jsx";
import KnowledgePage from "./pages/KnowledgePage.jsx";
import GenesisPage from "./pages/GenesisPage.jsx";
import GenesisAdminPage from "./pages/GenesisAdminPage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import PublicInsightPage from "./pages/PublicInsightPage.jsx";
import SecurityPage from "./pages/settings/SecurityPage.jsx";
import ChangePinPage from "./pages/settings/security/ChangePinPage.jsx";
import BiometricsPage from "./pages/settings/security/BiometricsPage.jsx";
import IdentityPage from "./pages/settings/IdentityPage.jsx";
import VerifyBvnPage from "./pages/settings/identity/VerifyBvnPage.jsx";
import VerifyNinPage from "./pages/settings/identity/VerifyNinPage.jsx";
import PersonalInfoPage from "./pages/settings/identity/PersonalInfoPage.jsx";
import BankingPage from "./pages/settings/BankingPage.jsx";
import FundingAccountsPage from "./pages/settings/banking/FundingAccountsPage.jsx";
import WithdrawalAccountsPage from "./pages/settings/banking/WithdrawalAccountsPage.jsx";
import DocumentsPage from "./pages/settings/DocumentsPage.jsx";
import StatementPage from "./pages/settings/documents/StatementPage.jsx";
import DarkModePage from "./pages/settings/app/DarkModePage.jsx";
import SupportPage from "./pages/settings/SupportPage.jsx";
import ContactPage from "./pages/settings/ContactPage.jsx";
import LockRulesPage from "./pages/settings/LockRulesPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {
  ENABLE_FOUNDER_DASHBOARD,
  ENABLE_PUBLIC_AUTH_ROUTES,
  FOUNDER_DASHBOARD_PATH,
  ENABLE_APP_ROUTES,
} from "./config/featureFlags.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/why-nomad" element={<WhyNomadPage />} />
      <Route path="/values" element={<ValuesPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />
      <Route path="/nomad-card" element={<NomadCardPage />} />
      <Route path="/dynasty" element={<DynastyPage />} />
      <Route path="/tax-efficiency" element={<TaxEfficiencyPage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="/genesis" element={<GenesisPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/insight" element={<PublicInsightPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/time-laws" element={<TimeLawsPage />} />
      <Route path="/ai-permissions" element={<AiPermissionsPage />} />
      <Route path="/history-spec" element={<HistorySpecPage />} />
      {ENABLE_PUBLIC_AUTH_ROUTES ? <Route path="/onboarding" element={<OnboardingPage />} /> : null}
      {ENABLE_PUBLIC_AUTH_ROUTES ? <Route path="/fast-entry" element={<FastEntryPage />} /> : null}
      {ENABLE_PUBLIC_AUTH_ROUTES ? (
        <Route path="/signup" element={<SignupPage />} />
      ) : (
        <Route path="/signup" element={<Navigate to="/genesis" replace />} />
      )}
      {ENABLE_PUBLIC_AUTH_ROUTES ? (
        <Route path="/login" element={<LoginPage />} />
      ) : (
        <Route path="/login" element={<Navigate to="/genesis" replace />} />
      )}
      <Route path="/pin/create" element={<PinCreatePage />} />
      <Route path="/pin/confirm" element={<PinConfirmPage />} />
      <Route path="/verify/identity" element={<VerifyIdentityPage />} />
      <Route path="/connect-bank" element={<ConnectBankPage />} />
      {ENABLE_FOUNDER_DASHBOARD ? <Route path={FOUNDER_DASHBOARD_PATH} element={<GenesisAdminPage />} /> : null}

      {ENABLE_APP_ROUTES ? (
        <>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="home" element={<SafeHomePage />} />
            <Route path="locks" element={<LocksListPage />} />
            <Route path="locks/new" element={<Navigate to="/app/deposit" replace />} />
            <Route path="locks/:lockId" element={<LockDetailPage />} />
            <Route path="locks/:lockId/breach" element={<LockBreachPage />} />
            <Route path="locks/:lockId/relock" element={<LockRelockPage />} />
            <Route path="balances" element={<BalancesPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="vault" element={<VaultPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="values" element={<ValuesPage />} />
            <Route path="protocol" element={<ProtocolPage />} />
            <Route path="nomad-card" element={<NomadCardPage />} />
            <Route path="dynasty" element={<DynastyPage />} />
            <Route path="tax-efficiency" element={<TaxEfficiencyPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            {ENABLE_FOUNDER_DASHBOARD ? <Route path="genesis-admin" element={<GenesisAdminPage />} /> : null}
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="protocols" element={<RecurringProtocolsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="deposits" element={<DepositsListPage />} />
            <Route path="deposits/:depositId" element={<DepositDetailPage />} />
            <Route path="deposits/:depositId/release" element={<ReleaseDecisionPage />} />
            <Route path="deposits/:depositId/relock" element={<RelockConfirmPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/security" element={<SecurityPage />} />
            <Route path="settings/security/change-pin" element={<ChangePinPage />} />
            <Route path="settings/security/biometrics" element={<BiometricsPage />} />
            <Route path="settings/identity" element={<IdentityPage />} />
            <Route path="settings/identity/verify-bvn" element={<VerifyBvnPage />} />
            <Route path="settings/identity/verify-nin" element={<VerifyNinPage />} />
            <Route path="settings/identity/personal-info" element={<PersonalInfoPage />} />
            <Route path="settings/banking" element={<BankingPage />} />
            <Route path="settings/banking/funding" element={<FundingAccountsPage />} />
            <Route path="settings/banking/withdrawal" element={<WithdrawalAccountsPage />} />
            <Route path="settings/documents" element={<DocumentsPage />} />
            <Route path="settings/documents/statement" element={<StatementPage />} />
            <Route path="settings/app/dark-mode" element={<DarkModePage />} />
            <Route path="settings/support" element={<SupportPage />} />
            <Route path="settings/contact" element={<ContactPage />} />
            <Route path="settings/lock-rules" element={<LockRulesPage />} />
          </Route>

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SafeHomePage />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/app/*" element={<Navigate to="/genesis" replace />} />
          <Route path="/home/*" element={<Navigate to="/genesis" replace />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * FILE ROLE:
 * Defines client-side routes for NOMAD.
 *
 * CONNECTS TO:
 * - pages/* (route components)
 * - components/ProtectedRoute.jsx
 * - components/AppLayout.jsx
 *
 * USED BY:
 * - src/main.jsx
 */


