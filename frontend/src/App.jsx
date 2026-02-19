import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {
  ENABLE_FOUNDER_DASHBOARD,
  ENABLE_PUBLIC_AUTH_ROUTES,
  FOUNDER_DASHBOARD_PATH,
  ENABLE_APP_ROUTES,
} from "./config/featureFlags.js";

const WhyNomadPage = lazy(() => import("./pages/WhyNomadPage.jsx"));
const RulesPage = lazy(() => import("./pages/RulesPage.jsx"));
const TimeLawsPage = lazy(() => import("./pages/TimeLawsPage.jsx"));
const AiPermissionsPage = lazy(() => import("./pages/AiPermissionsPage.jsx"));
const HistorySpecPage = lazy(() => import("./pages/HistorySpecPage.jsx"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage.jsx"));
const FastEntryPage = lazy(() => import("./pages/FastEntryPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const PinCreatePage = lazy(() => import("./pages/PinCreatePage.jsx"));
const PinConfirmPage = lazy(() => import("./pages/PinConfirmPage.jsx"));
const VerifyIdentityPage = lazy(() => import("./pages/VerifyIdentityPage.jsx"));
const ConnectBankPage = lazy(() => import("./pages/ConnectBankPage.jsx"));
const AppLayout = lazy(() => import("./components/AppLayout.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const SafeHomePage = lazy(() => import("./pages/SafeHomePage.jsx"));
const DepositPage = lazy(() => import("./pages/DepositPage.jsx"));
const DepositsListPage = lazy(() => import("./pages/DepositsListPage.jsx"));
const DepositDetailPage = lazy(() => import("./pages/DepositDetailPage.jsx"));
const ReleaseDecisionPage = lazy(() => import("./pages/ReleaseDecisionPage.jsx"));
const RelockConfirmPage = lazy(() => import("./pages/RelockConfirmPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const AccountsPage = lazy(() => import("./pages/AccountsPage.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));
const LocksListPage = lazy(() => import("./pages/LocksListPage.jsx"));
const LockDetailPage = lazy(() => import("./pages/LockDetailPage.jsx"));
const LockBreachPage = lazy(() => import("./pages/LockBreachPage.jsx"));
const LockRelockPage = lazy(() => import("./pages/LockRelockPage.jsx"));
const BalancesPage = lazy(() => import("./pages/BalancesPage.jsx"));
const HistoryPage = lazy(() => import("./pages/HistoryPage.jsx"));
const AuditPage = lazy(() => import("./pages/AuditPage.jsx"));
const VaultPage = lazy(() => import("./pages/VaultPage.jsx"));
const GuidePage = lazy(() => import("./pages/GuidePage.jsx"));
const ValuesPage = lazy(() => import("./pages/ValuesPage.jsx"));
const RecurringProtocolsPage = lazy(() => import("./pages/RecurringProtocolsPage.jsx"));
const ProtocolPage = lazy(() => import("./pages/ProtocolPage.jsx"));
const NomadCardPage = lazy(() => import("./pages/NomadCardPage.jsx"));
const DynastyPage = lazy(() => import("./pages/DynastyPage.jsx"));
const TaxEfficiencyPage = lazy(() => import("./pages/TaxEfficiencyPage.jsx"));
const KnowledgePage = lazy(() => import("./pages/KnowledgePage.jsx"));
const GenesisPage = lazy(() => import("./pages/GenesisPage.jsx"));
const GenesisAdminPage = lazy(() => import("./pages/GenesisAdminPage.jsx"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage.jsx"));
const PublicInsightPage = lazy(() => import("./pages/PublicInsightPage.jsx"));
const DisciplinePage = lazy(() => import("./pages/DisciplinePage.jsx"));
const HowToStopImpulsiveSpendingPage = lazy(() =>
  import("./pages/HowToStopImpulsiveSpendingPage.jsx")
);
const MoneySavingAppNigeriaPage = lazy(() => import("./pages/MoneySavingAppNigeriaPage.jsx"));
const NomadVsKudaPage = lazy(() => import("./pages/NomadVsKudaPage.jsx"));
const SecurityPublicPage = lazy(() => import("./pages/SecurityPublicPage.jsx"));
const WaitlistPage = lazy(() => import("./pages/WaitlistPage.jsx"));
const SecurityPage = lazy(() => import("./pages/settings/SecurityPage.jsx"));
const ChangePinPage = lazy(() => import("./pages/settings/security/ChangePinPage.jsx"));
const BiometricsPage = lazy(() => import("./pages/settings/security/BiometricsPage.jsx"));
const IdentityPage = lazy(() => import("./pages/settings/IdentityPage.jsx"));
const VerifyBvnPage = lazy(() => import("./pages/settings/identity/VerifyBvnPage.jsx"));
const VerifyNinPage = lazy(() => import("./pages/settings/identity/VerifyNinPage.jsx"));
const PersonalInfoPage = lazy(() => import("./pages/settings/identity/PersonalInfoPage.jsx"));
const BankingPage = lazy(() => import("./pages/settings/BankingPage.jsx"));
const FundingAccountsPage = lazy(() =>
  import("./pages/settings/banking/FundingAccountsPage.jsx")
);
const WithdrawalAccountsPage = lazy(() =>
  import("./pages/settings/banking/WithdrawalAccountsPage.jsx")
);
const DocumentsPage = lazy(() => import("./pages/settings/DocumentsPage.jsx"));
const StatementPage = lazy(() => import("./pages/settings/documents/StatementPage.jsx"));
const DarkModePage = lazy(() => import("./pages/settings/app/DarkModePage.jsx"));
const SupportPage = lazy(() => import("./pages/settings/SupportPage.jsx"));
const ContactPage = lazy(() => import("./pages/settings/ContactPage.jsx"));
const LockRulesPage = lazy(() => import("./pages/settings/LockRulesPage.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="page"><p className="hint">Loading...</p></div>}>
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
      <Route path="/discipline" element={<DisciplinePage />} />
      <Route
        path="/how-to-stop-impulsive-spending-in-nigeria"
        element={<HowToStopImpulsiveSpendingPage />}
      />
      <Route path="/money-saving-app-nigeria" element={<MoneySavingAppNigeriaPage />} />
      <Route path="/nomad-vs-kuda" element={<NomadVsKudaPage />} />
      <Route path="/security" element={<SecurityPublicPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
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
    </Suspense>
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


