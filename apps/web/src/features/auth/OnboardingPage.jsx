import { Link } from "react-router-dom";
import LogoLockup from "../../components/LogoLockup.jsx";
import { AUTH_FLOW_COPY } from "./authFlowCopy.js";

export default function OnboardingPage() {
  const { onboarding } = AUTH_FLOW_COPY;

  return (
    <div className="authPage">
      <div className="authCard authCardTall">
        <LogoLockup size={40} label="NOMAD" className="authBrand" />
        <h1 className="authTitle">{onboarding.headline}</h1>
        <p className="hint">{onboarding.subtext}</p>
        <div className="actions">
          <Link className="primaryLink" to="/fast-entry">
            {onboarding.primaryCta}
          </Link>
          <Link className="ghostLink" to="/login">
            {onboarding.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Single-screen onboarding entry point (no forms, no scroll).
 *
 * CONNECTS TO:
 * - content/authFlowCopy.js
 * - components/LogoLockup.jsx
 *
 * USED BY:
 * - src/App.jsx (/onboarding)
 */

