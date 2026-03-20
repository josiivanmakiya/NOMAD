import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LandingPage = lazy(() => import("./features/landing/LandingPage.jsx"));
const AboutPage = lazy(() => import("./features/nomad/AboutPage.jsx"));
const RulesPage = lazy(() => import("./features/nomad/RulesPage.jsx"));
const CalculatorPage = lazy(() => import("./features/nomad/CalculatorPage.jsx"));
const SignupPage = lazy(() => import("./features/auth/SignupPage.jsx"));
const LoginPage = lazy(() => import("./features/auth/LoginPage.jsx"));
const DashboardPage = lazy(() => import("./features/app/DashboardPage.jsx"));
const SettingsPage = lazy(() => import("./features/app/SettingsPage.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="page"><p className="hint">Loading...</p></div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
