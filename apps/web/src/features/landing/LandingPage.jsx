import { useNavigate } from "react-router-dom";
import NomadNav from "../../components/NomadNav.jsx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400&family=DM+Mono:wght@400;500;600&display=swap');

  .lp-root{
    --white:#fafaf8;
    --ink:#0c0c0a;
    --body:#2e2e2b;
    --muted:#8a8a85;
    --border:#e8e8e3;
    --border-2:#d4d4cc;
    --green:#1a3320;
    --green-mid:#2a4d30;
    --green-text:#2a5030;
    --green-pale:#f0f5f0;
    --red:#b83232;
    --font-display:'Fraunces','Georgia',serif;
    --font-body:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;
    --font-mono:'DM Mono',monospace;
  }
  .lp-root *{box-sizing:border-box;margin:0;padding:0;}
  .lp-root{background:var(--white);color:var(--ink);font-family:var(--font-body);-webkit-font-smoothing:antialiased;}

  /* NAV */
  .lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;background:rgba(250,250,248,0.92);backdrop-filter:blur(20px);border-bottom:1px solid transparent;transition:border-color 0.3s;}
  .lp-nav.scrolled{border-color:var(--border);}
  .lp-nav-logo{font-family:var(--font-display);font-size:20px;font-weight:800;letter-spacing:-0.03em;color:var(--ink);cursor:pointer;}
  .lp-nav-links{display:flex;align-items:center;gap:32px;}
  .lp-nav-link{font-size:14px;color:var(--muted);cursor:pointer;font-weight:500;transition:color 0.2s;background:none;border:none;font-family:var(--font-body);}
  .lp-nav-link:hover{color:var(--ink);}
  .lp-nav-btn{padding:9px 22px;background:var(--green);color:#fff;font-size:14px;font-weight:600;border:none;cursor:pointer;font-family:var(--font-body);border-radius:980px;transition:background 0.2s;}
  .lp-nav-btn:hover{background:var(--green-mid);}

  /* HERO */
  .lp-hero{min-height:100vh;display:grid;grid-template-columns:1fr 400px;gap:80px;align-items:center;padding:100px 52px 80px;max-width:1080px;margin:0 auto;border-bottom:1px solid var(--border);}
  .lp-hero-meta{display:flex;align-items:center;gap:10px;margin-bottom:32px;}
  .lp-hero-dot{width:6px;height:6px;border-radius:50%;background:var(--green-mid);}
  .lp-hero-eyebrow{font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);}
  .lp-display{font-family:var(--font-display);font-size:clamp(48px,6.5vw,84px);font-weight:800;line-height:0.95;letter-spacing:-0.04em;color:var(--ink);margin-bottom:24px;}
  .lp-display em{font-style:italic;font-weight:300;}
  .lp-hero-desc{font-size:18px;color:var(--body);line-height:1.7;max-width:460px;margin-bottom:36px;font-weight:400;}
  .lp-hero-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
  .lp-btn-primary{padding:13px 28px;background:var(--green);color:#fff;font-size:15px;font-weight:600;border:none;cursor:pointer;font-family:var(--font-body);border-radius:980px;transition:all 0.2s;}
  .lp-btn-primary:hover{background:var(--green-mid);transform:translateY(-1px);}
  .lp-btn-outline{padding:13px 28px;background:transparent;color:var(--ink);font-size:15px;font-weight:500;border:1px solid var(--border-2);cursor:pointer;font-family:var(--font-body);border-radius:980px;transition:all 0.2s;}
  .lp-btn-outline:hover{border-color:var(--ink);}

  /* SCORE CARD */
  .lp-score-card{background:var(--green);border-radius:24px;padding:36px;color:#fff;position:relative;overflow:hidden;}
  .lp-score-card-label{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:8px;}
  .lp-score-num{font-family:var(--font-display);font-size:72px;font-weight:800;line-height:1;letter-spacing:-0.04em;margin-bottom:4px;}
  .lp-score-status{font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:24px;}
  .lp-score-bar{height:2px;background:rgba(255,255,255,0.12);margin-bottom:24px;}
  .lp-score-bar-fill{height:100%;background:rgba(255,255,255,0.5);width:62%;}
  .lp-score-row{display:flex;justify-content:space-between;padding:11px 0;border-top:1px solid rgba(255,255,255,0.07);font-size:13px;}
  .lp-score-row-label{color:rgba(255,255,255,0.35);}
  .lp-score-row-val{color:rgba(255,255,255,0.75);font-weight:500;}
  .lp-score-row-val.good{color:#7ecf96;}
  .lp-score-row-val.warn{color:#e8c97a;}

  /* NUMBERS */
  .lp-numbers{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border);}
  .lp-number{padding:56px 52px;border-right:1px solid var(--border);}
  .lp-number:last-child{border-right:none;}
  .lp-number strong{display:block;font-family:var(--font-display);font-size:clamp(40px,5vw,64px);font-weight:800;letter-spacing:-0.04em;line-height:1;color:var(--ink);margin-bottom:8px;}
  .lp-number p{font-size:14px;color:var(--muted);line-height:1.5;}

  /* WHAT */
  .lp-what{padding:96px 52px;max-width:1080px;margin:0 auto;border-bottom:1px solid var(--border);}
  .lp-section-rule{display:flex;align-items:center;gap:16px;margin-bottom:52px;}
  .lp-section-rule-line{flex:1;height:1px;background:var(--border);}
  .lp-section-label{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);}
  .lp-heading{font-family:var(--font-display);font-size:clamp(32px,4vw,52px);font-weight:700;line-height:1;letter-spacing:-0.03em;color:var(--ink);margin-bottom:52px;}
  .lp-heading em{font-style:italic;font-weight:300;}
  .lp-what-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border);overflow:hidden;}
  .lp-what-cell{padding:40px 32px;border-right:1px solid var(--border);transition:background 0.15s;}
  .lp-what-cell:last-child{border-right:none;}
  .lp-what-cell:hover{background:#fff;}
  .lp-what-num{font-family:var(--font-display);font-size:13px;font-weight:300;color:#d4d4cc;margin-bottom:20px;display:block;}
  .lp-what-cell h3{font-family:var(--font-display);font-size:22px;font-weight:700;letter-spacing:-0.02em;color:var(--ink);margin-bottom:12px;line-height:1.1;}
  .lp-what-cell p{font-size:15px;color:var(--body);line-height:1.75;}

  /* HOW */
  .lp-how{background:var(--green);border-radius:24px;margin:0 52px 96px;overflow:hidden;}
  .lp-how-top{padding:64px;border-bottom:1px solid rgba(255,255,255,0.07);}
  .lp-how-top .lp-section-label{color:rgba(255,255,255,0.3);}
  .lp-how-top .lp-heading{color:#fff;margin-bottom:0;}
  .lp-how-steps{display:grid;grid-template-columns:repeat(5,1fr);}
  .lp-how-step{padding:36px 28px;border-right:1px solid rgba(255,255,255,0.06);}
  .lp-how-step:last-child{border-right:none;}
  .lp-how-step-n{font-family:var(--font-display);font-size:16px;font-weight:400;color:rgba(255,255,255,0.25);margin-bottom:18px;display:block;}
  .lp-how-step h4{font-size:16px;font-weight:700;color:rgba(255,255,255,0.92);margin-bottom:10px;line-height:1.45;}
  .lp-how-step p{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.75;}

  /* CTA */
  .lp-cta{background:var(--green);border-radius:24px;padding:80px 64px;text-align:center;margin:0 52px 96px;}
  .lp-cta h2{font-family:var(--font-display);font-size:clamp(32px,4vw,52px);font-weight:700;letter-spacing:-0.03em;color:#fff;margin-bottom:14px;line-height:1;}
  .lp-cta h2 em{font-style:italic;font-weight:300;}
  .lp-cta p{font-size:17px;color:rgba(255,255,255,0.45);margin-bottom:32px;}
  .lp-cta-btn{background:#fff;color:var(--green);font-size:15px;font-weight:700;padding:13px 32px;border-radius:980px;border:none;cursor:pointer;font-family:var(--font-body);transition:all 0.2s;margin:0 6px;}
  .lp-cta-btn:hover{background:var(--green-pale);}
  .lp-cta-btn-outline{background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.22);font-size:15px;font-weight:500;padding:13px 32px;border-radius:980px;cursor:pointer;font-family:var(--font-body);transition:all 0.2s;margin:0 6px;}
  .lp-cta-btn-outline:hover{color:#fff;border-color:rgba(255,255,255,0.6);}

  /* FOOTER */
  .lp-footer{padding:32px 52px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
  .lp-footer-logo{font-family:var(--font-display);font-size:18px;font-weight:800;letter-spacing:-0.03em;color:var(--ink);}
  .lp-footer-links{display:flex;gap:28px;}
  .lp-footer-link{font-size:13px;color:var(--muted);cursor:pointer;background:none;border:none;font-family:var(--font-body);transition:color 0.2s;}
  .lp-footer-link:hover{color:var(--ink);}
  .lp-footer-copy{font-size:13px;color:var(--muted);}

  @media(max-width:960px){
    .lp-nav{padding:0 20px;}
    .lp-hero{grid-template-columns:1fr;padding:90px 20px 60px;gap:40px;}
    .lp-numbers{grid-template-columns:1fr;}
    .lp-number{border-right:none;border-bottom:1px solid var(--border);padding:36px 20px;}
    .lp-what{padding:64px 20px;}
    .lp-what-grid{grid-template-columns:1fr;}
    .lp-what-cell{border-right:none;border-bottom:1px solid var(--border);}
    .lp-how{margin:0 20px 64px;}
    .lp-how-steps{grid-template-columns:1fr 1fr;}
    .lp-how-top{padding:40px 24px;}
    .lp-cta{margin:0 20px 64px;padding:48px 28px;}
    .lp-footer{padding:24px 20px;}
  }
`;

const steps = [
  { n:"01", title:"Sign up and read the rules", body:"Create your account. Read how locks work and what breaking early costs. You join knowing exactly what you are committing to." },
  { n:"02", title:"Connect your bank", body:"Link your Nigerian bank account. Nomad uses it to receive your locked capital and return it on maturity." },
  { n:"03", title:"Set your lock amount", body:"Choose how much to lock. Your lock duration is calculated by how significant the amount is relative to your income." },
  { n:"04", title:"Hold the lock", body:"The lock runs. Your score builds each day. On maturity the money returns — or relocks automatically if you do nothing." },
  { n:"05", title:"Access financial services", body:"As your score grows, financial products unlock — matched to your score, not your paperwork." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp-root">
      <style>{styles}</style>

      <NomadNav />

      {/* HERO */}
      <div className="lp-hero" style={{ paddingTop: 120 }}>
        <div>
          <div className="lp-hero-meta">
            <div className="lp-hero-dot"/>
            <span className="lp-hero-eyebrow">Behavioral Finance Infrastructure · Nigeria</span>
          </div>
          <h1 className="lp-display">
            Your financial<br/>
            discipline,<br/>
            <em>on record.</em>
          </h1>
          <p className="lp-hero-desc">
            Nomad locks a portion of your money, scores how you handle it,
            and connects you to financial services based on that record —
            not your salary slip.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary" onClick={() => navigate("/signup")}>
              Start building your record
            </button>
            <button className="lp-btn-outline" onClick={() => navigate("/rules")}>
              Read the rules
            </button>
          </div>
        </div>
        <div className="lp-score-card">
          <div className="lp-score-card-label">Nomad Score</div>
          <div className="lp-score-num">734</div>
          <div className="lp-score-status">Active · 14 locks completed</div>
          <div className="lp-score-bar"><div className="lp-score-bar-fill"/></div>
          <div className="lp-score-row">
            <span className="lp-score-row-label">Current lock</span>
            <span className="lp-score-row-val good">₦25,000 · Day 18 of 30</span>
          </div>
          <div className="lp-score-row">
            <span className="lp-score-row-label">Streak</span>
            <span className="lp-score-row-val good">6 consecutive locks</span>
          </div>
          <div className="lp-score-row">
            <span className="lp-score-row-label">Last action</span>
            <span className="lp-score-row-val">Relock on maturity</span>
          </div>
          <div className="lp-score-row">
            <span className="lp-score-row-label">Insight</span>
            <span className="lp-score-row-val warn">Breaking now costs 41 pts + fee</span>
          </div>
        </div>
      </div>

      {/* NUMBERS */}
      <div className="lp-numbers">
        <div className="lp-number">
          <strong>40M+</strong>
          <p>Adults in Nigeria with real income and no formal credit record</p>
        </div>
        <div className="lp-number">
          <strong>₦1,000</strong>
          <p>Minimum entry. The record starts no matter how small you begin.</p>
        </div>
        <div className="lp-number">
          <strong>1 signal</strong>
          <p>Behavioral discipline — what every lender needs and nobody has measured until now</p>
        </div>
      </div>

      {/* WHAT */}
      <div className="lp-what">
        <div className="lp-section-rule">
          <span className="lp-section-label">What Nomad is</span>
          <div className="lp-section-rule-line"/>
        </div>
        <h2 className="lp-heading">Three things<br/><em>working together.</em></h2>
        <div className="lp-what-grid">
          {[
            { n:"01", title:"A vault", body:"Nomad holds a portion of your money in a time-lock. Not a savings account — a lock with a fixed duration and real consequences for breaking early. The money is always yours." },
            { n:"02", title:"A behavioral score", body:"Every action inside Nomad is recorded. Completing a lock raises your score. Breaking early drops it. Over time this becomes a verifiable record of how you handle money under pressure." },
            { n:"03", title:"A credit identity", body:"Your Nomad score determines what you can access — loans, insurance, investment products, preferential rates. The score is the qualification. It replaces the salary slip." },
          ].map(c => (
            <div className="lp-what-cell" key={c.n}>
              <span className="lp-what-num">{c.n}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW */}
      <div className="lp-how">
        <div className="lp-how-top">
          <span className="lp-section-label">How it works</span>
          <h2 className="lp-heading" style={{marginTop:"16px"}}>
            From sign-up to score<br/><em>in five steps.</em>
          </h2>
          <p className="lp-hero-desc" style={{ color: "rgba(255,255,255,0.5)", maxWidth: 560, marginTop: 16 }}>
            Five actions. One record. Each step is visible, timed, and scored.
          </p>
        </div>
        <div className="lp-how-steps">
          {steps.map(s => (
            <div className="lp-how-step" key={s.n}>
              <span className="lp-how-step-n">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="lp-cta">
        <h2>The record starts<br/><em>when you do.</em></h2>
        <p>Every day without a record is a day lenders cannot see.</p>
        <button className="lp-cta-btn" onClick={() => navigate("/signup")}>Start now</button>
        <button className="lp-cta-btn-outline" onClick={() => navigate("/login")}>Log in</button>
      </div>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">Nomad</div>
        <p className="lp-footer-copy">© 2025 Nomad — Behavioral finance infrastructure for Africa</p>
      </footer>
    </div>
  );
}
