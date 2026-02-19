import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function SecurityPublicPage() {
  return (
    <main className="seoPage">
      <Seo
        title="Nomad Security | Verified Accounts, Audit Trails, Rule-Based Controls"
        description="Nomad security model: verified account rails, role-based controls, and auditable lock/release events."
        canonical="https://nomadapp.co/security"
      />
      <section className="seoPageInner">
        <p className="seoEyebrow">security</p>
        <h1>Nomad security model</h1>
        <p>Nomad uses a rule-driven approach to protect funds and reduce operational risk.</p>
        <h2>Verified account rails</h2>
        <p>Funding and release flows are linked to verified accounts and controlled paths.</p>
        <h2>Auditable events</h2>
        <p>Lock, maturity, release, and relock activity is logged for traceability.</p>
        <h2>Behavior-first controls</h2>
        <p>Friction and lock rules are built to reduce impulse errors before they become losses.</p>
        <div className="seoActions">
          <Link to="/waitlist" className="primaryLink">
            request early access
          </Link>
        </div>
      </section>
    </main>
  );
}
