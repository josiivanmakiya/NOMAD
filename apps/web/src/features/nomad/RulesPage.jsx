import { useMemo, useState } from "react";
import NomadNav from "../../components/NomadNav.jsx";

const lockTable = [
  { pct: "Up to 2%", days: "1 day", note: "Entry level. Testing the system." },
  { pct: "2% – 5%", days: "3 days", note: "Regular habit forming." },
  { pct: "5% – 10%", days: "7 days", note: "Meaningful commitment." },
  { pct: "10% – 20%", days: "14 days", note: "Serious redirection." },
  { pct: "20% – 40%", days: "30 days", note: "Strong behavioral signal." },
  { pct: "40% – 80%", days: "60 days", note: "High conviction lock." },
  { pct: "80% – 150%", days: "90 days", note: "Capital concentration event." },
  { pct: "150%+", days: "120 days", note: "Major position. System review required." },
];

const unlockTable = [
  { case: "First early unlock in any 90-day window", fee: "3% of amount", impact: "−10 points. Logged with date." },
  { case: "Second early unlock in same 90-day window", fee: "5% of amount", impact: "−25 points. Loan access suspended 60 days." },
  { case: "Third early unlock in same 90-day window", fee: "7% of amount", impact: "−50 points. Breach flag visible to lenders for 180 days." },
];

const scoreTable = [
  { action: "Deposit locked", pts: "+1", why: "Record begins." },
  { action: "Lock matures without breach", pts: "+5", why: "Core behavior. Worth 5× the deposit action." },
  { action: "Auto-relock honored", pts: "+3", why: "Passive discipline. You did nothing — and that was correct." },
  { action: "30-day clean streak", pts: "+15", why: "Worth 3 completed locks. Consistency multiplier begins." },
  { action: "90-day clean streak", pts: "+50", why: "Quarter year. Worth 10 locks. Character is confirmed." },
  { action: "180-day clean streak", pts: "+120", why: "Half year without breach. Rare. Significant to any lender." },
  { action: "First early unlock (90-day window)", pts: "−10", why: "Single breach. Recoverable." },
  { action: "Protocol breach (2nd unlock)", pts: "−25", why: "Pattern signal. Loan access paused." },
  { action: "Chronic breach (3rd unlock)", pts: "−50", why: "Behavioral flag. Lender-visible for 180 days." },
];

const levels = [
  { name: "Prospect", pts: "0 points", unlocks: ["Record creation begins", "Lock engine active", "Dashboard access", "Discipline score tracking starts"] },
  { name: "Established", pts: "50 points", unlocks: ["Score visible to partner lenders", "Loan preview waitlist", "Behavioral history (30 days)", "Auto-relock dashboard visible"] },
  { name: "Trusted", pts: "150 points", unlocks: ["Micro-loan eligibility preview", "Small peer-to-peer loan access", "Behavioral history (90 days)", "Phase 2 early briefing"] },
  { name: "Proven", pts: "350 points", unlocks: ["Standard loan access via partners", "Community capital pool entry", "Full behavioral history to lenders", "Higher protocol flexibility"] },
  { name: "Recognized", pts: "700 points", unlocks: ["Preferred loan terms", "Phase 2 asset access — early window", "Private conduct record summary", "Tax vault advanced features"] },
  { name: "Distinguished", pts: "1,200 points", unlocks: ["Alternative credit tier — lender direct", "Peer lending eligibility", "Advanced asset allocation window", "Priority support"] },
  { name: "Sovereign", pts: "2,000 points", unlocks: ["Full behavioral credit — all lenders", "High-value asset access", "Dynasty lock activation", "Private client guidance"] },
];

export default function RulesPage() {
  const [locks, setLocks] = useState(12);
  const [streaks, setStreaks] = useState(3);
  const [breaches, setBreaches] = useState(0);

  const sim = useMemo(() => {
    const earned = locks * 6 + streaks * 15;
    const lost = breaches === 0 ? 0 : breaches === 1 ? 10 : breaches === 2 ? 35 : 35 + (breaches - 2) * 50;
    const score = Math.max(0, earned - lost);
    const thresholds = [0, 50, 150, 350, 700, 1200, 2000];
    let li = 0;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (score >= thresholds[i]) { li = i; break; }
    }
    const next = thresholds.find((t) => t > score);
    const nextLabel = next ? `${next - score} pts to ${levels[thresholds.indexOf(next)].name}` : "Maximum level achieved.";
    return { earned, lost, score, level: levels[li].name, nextLabel };
  }, [locks, streaks, breaches]);

  return (
    <div className="rules-page">
      <NomadNav />

      <section className="rules-hero">
        <div className="rules-container">
          <p className="rules-label">Read once. Operate clearly.</p>
          <h1 className="rules-title">Nomad Conduct <em>Rules</em></h1>
          <blockquote className="rules-quote">
            “There needed to be a system that recorded how people actually behaved with money.
            Not their wealth. Their behavior.”
          </blockquote>
          <p className="rules-quote-attrib">Lewis Tappan · Mercantile Agency · 1841</p>
          <div className="rules-callout">
            Nomad is that system for you. Your record here is permanent. It cannot be deleted —
            only built or damaged. Lenders read this record. Not your bank balance. Your behavior.
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 01</p>
          <h2 className="rules-heading">The Lock</h2>
          <p className="rules-body">
            Every deposit enters a time-lock immediately. The lock is not punishment — it is the
            mechanism that separates you from your impulse. Lock durations are set as a percentage
            of your monthly income, making the standard equal regardless of how much you earn.
          </p>
          <div className="rules-note">
            <strong>Income-relative, not amount-fixed.</strong> ₦50,000 to someone earning ₦100k/month
            is a different decision than the same amount to someone earning ₦2M/month. The discipline
            standard is equal. The naira amount is not the measure — the proportion is.
          </div>
          <div className="rules-table-wrap">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Deposit as % of monthly income</th>
                  <th>Lock duration</th>
                  <th>What this signals</th>
                </tr>
              </thead>
              <tbody>
                {lockTable.map((row) => (
                  <tr key={row.pct}>
                    <td>{row.pct}</td>
                    <td className="num">{row.days}</td>
                    <td className="dim">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rules-insight">
            <strong>Auto-relock:</strong> Matured funds not touched within 6 hours re-lock automatically
            at half the original duration. Three notifications are sent first. The system defaults to preservation.
          </div>
          <div className="rules-insight">
            <strong>Closed loop:</strong> Withdrawals return only to your verified linked bank account. No
            peer transfers. No third-party destinations. This is non-negotiable.
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 02</p>
          <h2 className="rules-heading">Early Unlock</h2>
          <p className="rules-body">
            Early unlock is permitted. Your money is always yours. But every breach is logged permanently
            and the cost scales with repetition. The system does not trap you. It records what you actually did.
          </p>
          <div className="rules-table-wrap">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Fee</th>
                  <th>Record impact</th>
                </tr>
              </thead>
              <tbody>
                {unlockTable.map((row) => (
                  <tr key={row.case}>
                    <td>{row.case}</td>
                    <td className="warn">{row.fee}</td>
                    <td className="neg">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rules-insight bad">
            <strong>Breach flags do not disappear.</strong> After 180 days of clean behavior they are marked
            resolved — but the record remains. A lender sees the full history: breach, date, resolution.
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 03</p>
          <h2 className="rules-heading">Discipline Score</h2>
          <p className="rules-body">
            Every action earns or costs points. Streaks are rewarded exponentially — because consistency
            over time is the entire signal lenders need.
          </p>
          <div className="rules-table-wrap">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Points</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {scoreTable.map((row) => (
                  <tr key={row.action}>
                    <td>{row.action}</td>
                    <td className={row.pts.startsWith("+") ? "pos" : "neg"}>{row.pts}</td>
                    <td className="dim">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rules-insight">
            <strong>Streak logic:</strong> A 30-day streak (+15) equals 3 completed locks. A 90-day streak (+50)
            equals 10 locks. A 180-day streak (+120) equals 24 locks. The longer your run, the more valuable each
            clean day becomes.
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 04</p>
          <h2 className="rules-heading">Conduct Levels</h2>
          <p className="rules-body">
            These are not badges. They are access tiers. Each level unlocks something real — loan eligibility,
            lender visibility, asset access.
          </p>
          <div className="rules-levels">
            {levels.map((level) => (
              <div className="rules-level-card" key={level.name}>
                <div className="rules-level-top">
                  <h3>{level.name}</h3>
                  <span>{level.pts}</span>
                </div>
                <ul>
                  {level.unlocks.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 05</p>
          <h2 className="rules-heading">Failure States</h2>
          <p className="rules-body">
            A failure state is not just a point deduction. It changes what the system shows lenders.
            Failure is permitted — it is recorded accurately.
          </p>
          <div className="rules-grid">
            <div className="rules-grid-card">
              <p className="rules-grid-label">Level 1</p>
              <h3>Single Breach</h3>
              <p>First early unlock in 90-day window. −10 points. Logged with date and amount.</p>
            </div>
            <div className="rules-grid-card">
              <p className="rules-grid-label">Level 2</p>
              <h3>Pattern Breach</h3>
              <p>Second early unlock in same window. −25 points. Loan access suspended 60 days.</p>
            </div>
            <div className="rules-grid-card">
              <p className="rules-grid-label">Level 3</p>
              <h3>Chronic Breach</h3>
              <p>Third early unlock. −50 points. Breach flag visible to lenders for 180 days.</p>
            </div>
            <div className="rules-grid-card">
              <p className="rules-grid-label">Level 4</p>
              <h3>Dormancy</h3>
              <p>Account inactive 90+ days with locked funds. Safety auto-relock triggered.</p>
            </div>
          </div>
          <div className="rules-insight bad">
            <strong>Breach flags resolve — they do not disappear.</strong> After the 180-day clean period the
            flag is marked resolved. The original breach date, amount, and context remain permanently on file.
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="rules-container">
          <p className="rules-section-num">Part 06</p>
          <h2 className="rules-heading">Withdrawal Rule</h2>
          <p className="rules-body">
            You can always withdraw matured funds to your verified bank account. Your money is yours.
            What changes is your record.
          </p>
          <div className="rules-card">
            <h3>Closed loop. Always.</h3>
            <p>
              Withdrawals return to your verified linked account only. No peer transfers. No third-party destinations.
              The narrow transfer surface protects your capital from social pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="rules-section rules-simulator">
        <div className="rules-container">
          <p className="rules-section-num">Simulator</p>
          <h2 className="rules-heading">Score Simulator</h2>
          <p className="rules-body">See how your behavior builds — or damages — your conduct record over time.</p>
          <div className="rules-sim">
            <div className="rules-sim-fields">
              <label>
                Locks completed (clean)
                <input type="number" value={locks} min="0" max="200" onChange={(e) => setLocks(Number(e.target.value))} />
              </label>
              <label>
                30-day streaks achieved
                <input type="number" value={streaks} min="0" max="24" onChange={(e) => setStreaks(Number(e.target.value))} />
              </label>
              <label>
                Early unlocks triggered
                <input type="number" value={breaches} min="0" max="20" onChange={(e) => setBreaches(Number(e.target.value))} />
              </label>
            </div>
            <div className="rules-sim-results">
              <div>
                <span>Total score</span>
                <strong>{sim.score}</strong>
              </div>
              <div>
                <span>Points earned</span>
                <strong>+{sim.earned}</strong>
              </div>
              <div>
                <span>Points lost</span>
                <strong>{sim.lost > 0 ? `−${sim.lost}` : "0"}</strong>
              </div>
            </div>
            <p className="rules-sim-note">Current level: <strong>{sim.level}</strong> — {sim.nextLabel}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
