import Logo from "./Logo.jsx";

export default function LogoLockup({ size = 32, label = "NOMAD", className = "" }) {
  const isNomadLabel = /nomad/i.test(String(label));
  return (
    <div className={`logoLockup ${className}`.trim()}>
      <Logo size={size} />
      <span className={isNomadLabel ? "nomadWord" : ""}>{label}</span>
    </div>
  );
}

/**
 * FILE ROLE:
 * Logo mark + wordmark lockup to keep the SVG paired with the brand name.
 *
 * CONNECTS TO:
 * - components/Logo.jsx
 *
 * USED BY:
 * - pages/LandingPage.jsx
 * - components/Sidebar.jsx
 */

