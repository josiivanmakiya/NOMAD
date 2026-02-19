import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function MoneySavingAppNigeriaPage() {
  return (
    <main className="seoPage">
      <Seo
        title="Best Money Saving Apps In Nigeria | Nomad"
        description="Compare money saving apps in Nigeria and see where Nomad fits: behavior-first savings with time-lock friction."
        canonical="https://nomadapp.co/money-saving-app-nigeria"
      />
      <section className="seoPageInner">
        <p className="seoEyebrow">comparison</p>
        <h1>Best money saving apps in Nigeria</h1>
        <p>
          Different apps solve different problems. Some optimize payments. Some optimize savings.
          Nomad focuses on financial discipline through friction.
        </p>
        <h2>Popular options people compare</h2>
        <ul className="seoList">
          <li>OPay</li>
          <li>Kuda</li>
          <li>PalmPay</li>
          <li>Nomad</li>
        </ul>
        <h2>Where Nomad is different</h2>
        <p>
          Nomad is built for people who want to reduce impulse spending and protect capital using
          time-based lock rules.
        </p>
        <div className="seoActions">
          <Link to="/nomad-vs-kuda" className="ghostLink">
            read nomad vs kuda
          </Link>
          <Link to="/waitlist" className="primaryLink">
            join waitlist
          </Link>
        </div>
      </section>
    </main>
  );
}
