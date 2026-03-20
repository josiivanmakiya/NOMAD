import NomadNav from "../../components/NomadNav.jsx";

export default function AboutPage() {
  return (
    <div className="about-page">
      <NomadNav />

      <section className="about-hero">
        <div className="about-container">
          <p className="about-label">Why we built this</p>
          <h1 className="about-display">
            Not a savings app.<br />
            Not a bank.<br />
            <em>A witness system.</em>
          </h1>
          <p className="about-lead">
            Nigeria spent over ₦130 trillion in eight years. Almost none of it became
            capital. The problem is not that Nigerians don&apos;t earn enough. It is that
            the money moves too fast, in the wrong direction, without record. We built
            the record.
          </p>
          <div className="about-actions">
            <button className="btn btn-primary" type="button">Start building your record</button>
            <button className="btn btn-ghost" type="button">Read the rules</button>
          </div>
        </div>
      </section>

      <section className="about-principle">
        <div className="about-container about-principle-inner">
          <p className="about-label">The founding principle · 1841</p>
          <blockquote className="about-quote">
            “There needed to be a system that recorded how people actually behaved with money.
            Not their wealth. Their behavior.”
          </blockquote>
          <p className="about-quote-attrib">Lewis Tappan · Mercantile Agency</p>
          <p className="about-body">
            The idea that built the American credit system.
          </p>
        </div>
      </section>

      <section className="about-origin">
        <div className="about-container about-origin-grid">
          <div className="about-year">1841</div>
          <div>
            <p className="about-body">
              In 1841, Lewis Tappan noticed that merchants were doing business with strangers —
              people no one could vouch for. The question every creditor had was the same: can
              this person be trusted with money?
            </p>
            <p className="about-body">
              His answer was simple. He built a network of observers who wrote down what they
              actually saw. Did merchants pay on time? Did they honor commitments under pressure?
              That behavioral record became the Mercantile Agency — and eventually the American
              credit system.
            </p>
            <p className="about-quote-line">
              They did not invent wealth. They invented proof of behavior. Everything that
              followed was built on top of that proof system.
            </p>
            <p className="about-body">
              Nigeria in 2025 has the same unsolved problem. Over 40 million adults are
              credit-invisible — not because they are undisciplined, but because no system has
              been watching. Nomad is that system. The protocol itself is the witness. Every
              lock completed. Written down permanently. Yours to show.
            </p>
          </div>
        </div>
      </section>

      <section className="about-truths">
        <div className="about-container">
          <p className="about-label">What we know to be true</p>
          <div className="about-truth">
            <div className="about-truth-num">01</div>
            <div>
              <h3>Access is the problem. Not discipline.</h3>
              <p>
                When money is instantly available, it is instantly vulnerable. Removing instant
                access does not require willpower — it requires architecture. Nomad is that
                architecture.
              </p>
            </div>
          </div>
          <div className="about-truth">
            <div className="about-truth-num">02</div>
            <div>
              <h3>Behavior is more valuable than balance.</h3>
              <p>
                Consistency under constraint is the signal lenders need and currently cannot see
                anywhere in Africa. That is what Nomad measures.
              </p>
            </div>
          </div>
          <div className="about-truth">
            <div className="about-truth-num">03</div>
            <div>
              <h3>The system records accurately. It does not judge.</h3>
              <p>
                Early unlocks are permitted. Mistakes are allowed. A clean record built over time
                is worth more than a perfect record built over a week.
              </p>
            </div>
          </div>
          <div className="about-truth">
            <div className="about-truth-num">04</div>
            <div>
              <h3>Wealth passes through systems, not accounts.</h3>
              <p>
                Illiquidity is the strategy of every person who builds generational wealth. Nomad
                translates that into infrastructure that works at ₦1,000 entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-what">
        <div className="about-container">
          <p className="about-label">Be clear about what this is</p>
          <div className="about-what-grid">
            <div className="about-what-card">
              <p className="about-what-tag about-what-tag-neg">What Nomad is not</p>
              <h3>Not a savings app</h3>
              <ul>
                <li>A savings app that makes you feel good for depositing</li>
                <li>An investment platform promising returns</li>
                <li>A bank maximizing your spending velocity</li>
                <li>A loyalty program with badges for show</li>
                <li>A motivational tool that softens the truth</li>
                <li>PiggyVest with different branding</li>
              </ul>
            </div>
            <div className="about-what-card">
              <p className="about-what-tag about-what-tag-pos">What Nomad is</p>
              <h3>A behavioral record</h3>
              <ul>
                <li>A discipline protocol with real consequences</li>
                <li>A permanent record of how you handle money under pressure</li>
                <li>Alternative credit infrastructure for people the formal system cannot see</li>
                <li>A mirror that shows you the numbers before you rationalize them</li>
                <li>The friction between your money and your impulse</li>
                <li>Rails that sit above every wallet in Africa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-africa">
        <div className="about-container about-africa-grid">
          <div>
            <p className="about-label">Africa — not just Nigeria.</p>
            <h2 className="about-heading">Nomad is built to travel.</h2>
            <p className="about-body">
              The same problem exists in Ghana, Kenya, Rwanda, Senegal, Egypt.
              40 million credit‑invisible Nigerians. Multiply that across the continent.
            </p>
            <p className="about-body">
              Behavioral discipline is not a Nigerian problem. It is an African problem.
              Nomad is built to travel.
            </p>
            <div className="about-currency">
              <span>NGN</span><span>GHS</span><span>KES</span><span>ZAR</span><span>UGX</span>
              <span>TZS</span><span>RWF</span><span>XOF</span><span>EGP</span><span>MAD</span>
              <span className="about-currency-more">+ 20 more African currencies in Phase 2</span>
            </div>
          </div>
          <div className="about-metrics">
            <div>
              <strong>54</strong>
              <p>countries — one continent, one problem</p>
            </div>
            <div>
              <strong>300M+</strong>
              <p>adults — credit‑invisible across Africa</p>
            </div>
            <div>
              <strong>1</strong>
              <p>signal — behavioral discipline, measurable anywhere</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-container about-cta-inner">
          <h2>The record starts<br /><em>when you do.</em></h2>
          <p>Every day without a record is a day lenders cannot see.</p>
          <div className="about-actions">
            <button className="btn btn-primary" type="button">Start now</button>
            <button className="btn btn-ghost" type="button">Read the rules</button>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <div className="about-container about-footer-inner">
          <span className="about-footer-logo">Nomad</span>
          <span>© 2025 Nomad — The protocol does not judge you. It records you accurately.</span>
        </div>
      </footer>
    </div>
  );
}
