import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
const DisciplinePage = lazy(() => import("./pages/DisciplinePage.jsx"));
const RulesPage = lazy(() => import("./pages/RulesPage.jsx"));
const PublicInsightPage = lazy(() => import("./pages/PublicInsightPage.jsx"));
const GenesisAdminPage = lazy(() => import("./pages/GenesisAdminPage.jsx"));
const GenesisPage = lazy(() => import("./pages/GenesisPage.jsx"));
const SecurityPage = lazy(() => import("./pages/settings/SecurityPage.jsx"));
const ChangePinPage = lazy(() => import("./pages/settings/security/ChangePinPage.jsx"));
const BiometricsPage = lazy(() => import("./pages/settings/security/BiometricsPage.jsx"));
const IdentityPage = lazy(() => import("./pages/settings/IdentityPage.jsx"));
const VerifyBvnPage = lazy(() => import("./pages/settings/identity/VerifyBvnPage.jsx"));
const VerifyNinPage = lazy(() => import("./pages/settings/identity/VerifyNinPage.jsx"));
const PersonalInfoPage = lazy(() => import("./pages/settings/identity/PersonalInfoPage.jsx"));
const BankingPage = lazy(() => import("./pages/settings/BankingPage.jsx"));
const FundingAccountsPage = lazy(() => import("./pages/settings/banking/FundingAccountsPage.jsx"));
const WithdrawalAccountsPage = lazy(() => import("./pages/settings/banking/WithdrawalAccountsPage.jsx"));
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

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/insight" element={<PublicInsightPage />} />
        <Route path="/genesis" element={<GenesisPage />} />
        <Route path="/genesis-admin" element={<GenesisAdminPage />} />

        {/* Auth routes */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/fast-entry" element={<FastEntryPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pin/create" element={<PinCreatePage />} />
        <Route path="/pin/confirm" element={<PinConfirmPage />} />
        <Route path="/verify/identity" element={<VerifyIdentityPage />} />
        <Route path="/connect-bank" element={<ConnectBankPage />} />

        {/* Protected app routes */}
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
          <Route path="score" element={<DisciplinePage />} />
          <Route path="locks" element={<LocksListPage />} />
          <Route path="locks/new" element={<Navigate to="/app/deposit" replace />} />
          <Route path="locks/:lockId" element={<LockDetailPage />} />
          <Route path="locks/:lockId/breach" element={<LockBreachPage />} />
          <Route path="locks/:lockId/relock" element={<LockRelockPage />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="deposits" element={<DepositsListPage />} />
          <Route path="deposits/:depositId" element={<DepositDetailPage />} />
          <Route path="deposits/:depositId/release" element={<ReleaseDecisionPage />} />
          <Route path="deposits/:depositId/relock" element={<RelockConfirmPage />} />
          <Route path="balances" element={<BalancesPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="profile" element={<ProfilePage />} />
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

        <Route path="/home" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<SafeHomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
