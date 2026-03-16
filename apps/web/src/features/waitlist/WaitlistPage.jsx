import { Link } from "react-router-dom";
import Seo from "../../components/Seo.jsx";

export default function WaitlistPage() {
  return (
    <main className="seoPage">
      <Seo
        title="Nomad Waitlist | Financial Discipline App in Nigeria"
        description="Join the Nomad Genesis waitlist. Control spending, lock savings, and build long-term discipline."
        canonical="https://nomadapp.co/waitlist"
      />
      <section className="seoPageInner">
        <p className="seoEyebrow">early access</p>
        <h1>Join the Nomad waitlist</h1>
        <p>
          Nomad is for people who want strict financial discipline, reduced money leakage,
          and long-horizon capital retention.
        </p>
        <div className="seoActions">
          <a href="/#waitlist" className="primaryLink">
            open waitlist form
          </a>
          <Link to="/discipline" className="ghostLink">
            why nomad works
          </Link>
        </div>
      </section>
    </main>
  );
}
