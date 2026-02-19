import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function DisciplinePage() {
  return (
    <main className="seoPage">
      <Seo
        title="Financial Discipline App in Nigeria | Nomad"
        description="Nomad is the financial discipline app for Nigerians. Control spending with time-locks, friction, and behavior-first savings."
        canonical="https://nomadapp.co/discipline"
      />
      <section className="seoPageInner">
        <p className="seoEyebrow">financial discipline app</p>
        <h1>Control your spending. Build financial discipline.</h1>
        <p>
          Nomad is a financial discipline app that helps Nigerians control spending using
          time-locks and behavioral friction.
        </p>
        <h2>The financial discipline app for Nigerians</h2>
        <p>
          Most apps optimize transactions. Nomad optimizes behavior. Your money is protected
          from impulse until your lock matures.
        </p>
        <h2>Why saving money is hard without friction</h2>
        <p>
          Instant access often leads to instant spending. Friction creates a decision window that
          protects your long-term goals.
        </p>
        <h2>Lock money away from your future self</h2>
        <p>Set a lock, choose your horizon, and preserve capital with rules you cannot bypass casually.</p>
        <div className="seoActions">
          <Link to="/waitlist" className="primaryLink">
            join waitlist
          </Link>
          <Link to="/rules" className="ghostLink">
            read rules
          </Link>
        </div>
      </section>
    </main>
  );
}
