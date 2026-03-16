import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const LandingPage = lazy(() => import("./features/landing/LandingPage.jsx"));
const SignupPage = lazy(() => import("./features/auth/SignupPage.jsx"));
const LoginPage = lazy(() => import("./features/auth/LoginPage.jsx"));
const OnboardingPage = lazy(() => import("./features/auth/OnboardingPage.jsx"));
const PinCreatePage = lazy(() => import("./features/auth/PinCreatePage.jsx"));
const PinConfirmPage = lazy(() => import("./features/auth/PinConfirmPage.jsx"));
const VerifyIdentityPage = lazy(() => import("./features/auth/VerifyIdentityPage.jsx"));
const FastEntryPage = lazy(() => import("./features/app/FastEntryPage.jsx"));
const AppLayout = lazy(() => import("./components/AppLayout.jsx"));
const DashboardPage = lazy(() => import("./features/app/DashboardPage.jsx"));
const ConnectBankPage = lazy(() => import("./features/app/ConnectBankPage.jsx"));
const DepositPage = lazy(() => import("./features/app/DepositPage.jsx"));
const DepositsListPage = lazy(() => import("./features/app/DepositsListPage.jsx"));
const DepositDetailPage = lazy(() => import("./features/app/DepositDetailPage.jsx"));
const ReleaseDecisionPage = lazy(() => import("./features/app/ReleaseDecisionPage.jsx"));
const RelockConfirmPage = lazy(() => import("./features/app/RelockConfirmPage.jsx"));
const LocksListPage = lazy(() => import("./features/app/LocksListPage.jsx"));
const LockDetailPage = lazy(() => import("./features/app/LockDetailPage.jsx"));
const LockBreachPage = lazy(() => import("./features/app/LockBreachPage.jsx"));
const LockRelockPage = lazy(() => import("./features/app/LockRelockPage.jsx"));
const BalancesPage = lazy(() => import("./features/app/BalancesPage.jsx"));
const HistoryPage = lazy(() => import("./features/app/HistoryPage.jsx"));
const AuditPage = lazy(() => import("./features/app/AuditPage.jsx"));
const ProfilePage = lazy(() => import("./features/app/ProfilePage.jsx"));
const AccountsPage = lazy(() => import("./features/app/AccountsPage.jsx"));
const SettingsPage = lazy(() => import("./features/app/SettingsPage.jsx"));
const SafeHomePage = lazy(() => import("./features/app/SafeHomePage.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="page"><p className="hint">Loading...</p></div>}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/fast-entry" element={<FastEntryPage />} />
        <Route path="/pin/create" element={<PinCreatePage />} />
        <Route path="/pin/confirm" element={<PinConfirmPage />} />
        <Route path="/verify/identity" element={<VerifyIdentityPage />} />

        {/* Protected app */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<SafeHomePage />} />
          <Route path="connect-bank" element={<ConnectBankPage />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="deposits" element={<DepositsListPage />} />
          <Route path="deposits/:depositId" element={<DepositDetailPage />} />
          <Route path="deposits/:depositId/release" element={<ReleaseDecisionPage />} />
          <Route path="deposits/:depositId/relock" element={<RelockConfirmPage />} />
          <Route path="locks" element={<LocksListPage />} />
          <Route path="locks/new" element={<Navigate to="/app/deposit" replace />} />
          <Route path="locks/:lockId" element={<LockDetailPage />} />
          <Route path="locks/:lockId/breach" element={<LockBreachPage />} />
          <Route path="locks/:lockId/relock" element={<LockRelockPage />} />
          <Route path="balances" element={<BalancesPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
