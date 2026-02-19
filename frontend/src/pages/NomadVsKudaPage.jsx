import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NomadVsKudaPage() {
  return (
    <main className="seoPage">
      <Seo
        title="Nomad vs Kuda | Behavioral Finance vs Banking Flow"
        description="Nomad vs Kuda: Kuda is a digital bank. Nomad is a financial discipline system built to control spending and preserve capital."
        canonical="https://nomadapp.co/nomad-vs-kuda"
      />
      <section className="seoPageInner">
        <p className="seoEyebrow">nomad vs kuda</p>
        <h1>Nomad vs Kuda</h1>
        <p>
          Kuda is excellent for banking convenience. Nomad solves a different problem: controlling
          behavior and reducing spending leakage.
        </p>
        <h2>Kuda</h2>
        <p>Fast transactions, daily money movement, and account management.</p>
        <h2>Nomad</h2>
        <p>Time-lock architecture, behavioral friction, and discipline-led capital preservation.</p>
        <h2>Who should use Nomad</h2>
        <p>
          People who already earn but struggle to retain money because impulse access beats long-term plans.
        </p>
        <div className="seoActions">
          <Link to="/waitlist" className="primaryLink">
            join nomad waitlist
          </Link>
        </div>
      </section>
    </main>
  );
}
