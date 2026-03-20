import { useMemo, useState } from "react";
import NomadNav from "../../components/NomadNav.jsx";

const fmt = (n) => {
  if (n >= 1e9) return `₦${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `₦${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `₦${Math.round(n / 1e3)}K`;
  return `₦${Math.round(n)}`;
};

const fv = (pmt, r, n) => {
  if (r === 0) return pmt * n;
  return pmt * (Math.pow(1 + r, n) - 1) / r;
};

export default function CalculatorPage() {
  const [age, setAge] = useState(28);
  const [startAge, setStartAge] = useState(22);
  const [dailyLeak, setDailyLeak] = useState(2000);

  const calc = useMemo(() => {
    const mr = 0.10 / 12;
    const monthly = dailyLeak * 30;
    const yrs = Math.max(0, age - startAge);
    const red30 = monthly * 0.3;
    const lost = monthly * yrs * 12;
    const futureYrs = Math.max(20, 45 - age);
    const ghost = fv(red30, mr, (yrs + futureYrs) * 12);
    const l20 = monthly * 12 * 20;
    const c20 = fv(red30, mr, 240);
    const swing = l20 + c20;
    return { yrs, lost, ghost, l20, c20, swing };
  }, [age, startAge, dailyLeak]);

  return (
    <div className="calc-page">
      <NomadNav />

      <section className="calc-hero">
        <div className="calc-container">
          <p className="calc-label">Your personal audit</p>
          <h1 className="calc-title">
            How much have
            <br />
            you already <em>lost?</em>
          </h1>
          <p className="calc-lead">
            This is not a savings calculator. It shows you what your past behavior has already
            cost you — and what the next 20 years look like if nothing changes.
          </p>
        </div>
      </section>

      <section className="calc-main">
        <div className="calc-container calc-grid">
          <div className="calc-panel">
            <p className="calc-panel-title">Your profile</p>
            <label>
              Your current age
              <input type="number" value={age} min="18" max="65" onChange={(e) => setAge(Number(e.target.value))} />
            </label>
            <label>
              Age you started earning
              <input type="number" value={startAge} min="16" max="40" onChange={(e) => setStartAge(Number(e.target.value))} />
            </label>
            <label>
              Daily leak amount (₦)
              <input type="number" value={dailyLeak} min="100" step="100" onChange={(e) => setDailyLeak(Number(e.target.value))} />
            </label>
            <button className="btn btn-primary" type="button">Calculate my number</button>
            <p className="calc-note">Assumes 10% average annual growth for redirected capital.</p>
          </div>

          <div className="calc-panel">
            <div className="calc-block">
              <p className="calc-block-label">Already leaked since you started earning</p>
              <div className="calc-block-value neg">{fmt(calc.lost)}</div>
              <p className="calc-block-sub">{calc.yrs} year{calc.yrs !== 1 ? "s" : ""} of leaks. That money existed. It is gone.</p>
            </div>
            <div className="calc-block">
              <p className="calc-block-label">What redirecting 30% builds by age 45</p>
              <div className="calc-block-value pos">{fmt(calc.ghost)}</div>
              <p className="calc-block-sub">The upside of changing one habit.</p>
            </div>

            <div className="calc-divider" />

            <p className="calc-block-label">The 20-year decision you are making right now</p>
            <div className="calc-futures">
              <div>
                <p className="calc-future-label neg">Nothing changes</p>
                <div className="calc-future-value neg">{fmt(calc.l20)}</div>
                <p className="calc-future-sub">Gone. Nothing to show.</p>
              </div>
              <div>
                <p className="calc-future-label pos">Redirect 30% today</p>
                <div className="calc-future-value pos">{fmt(calc.c20)}</div>
                <p className="calc-future-sub">Built. Yours. Compounding.</p>
              </div>
            </div>

            <div className="calc-swing">
              <span>What doing nothing costs you</span>
              <strong>{fmt(calc.swing)}</strong>
            </div>
            <p className="calc-verdict">
              At <strong>{fmt(dailyLeak)}/day</strong> the gap between your two futures is{" "}
              <strong>{fmt(calc.swing)}</strong> over 20 years. That swing is the price of the decision
              you are making right now.
            </p>
            <p className="calc-note">Assumes 10% average annual growth for redirected capital.</p>
            <button className="btn btn-primary" type="button">Your number is real. Start building your record →</button>
          </div>
        </div>
      </section>

      <section className="calc-strip">
        <div className="calc-container calc-strip-grid">
          <div>
            <h3>The record starts now</h3>
            <p>Every day without a Nomad record is a day lenders cannot see. Your score starts on your first lock.</p>
            <button className="btn-link" type="button">Join the waitlist →</button>
          </div>
          <div>
            <h3>Read the rules first</h3>
            <p>Before you join, read exactly how the lock system works and what breaking early costs. No small print.</p>
            <button className="btn-link" type="button">Read the rules →</button>
          </div>
          <div>
            <h3>Why we built this</h3>
            <p>The story of why Nigeria&apos;s credit-invisible adults need a witness system — not another savings app.</p>
            <button className="btn-link" type="button">Read about Nomad →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
