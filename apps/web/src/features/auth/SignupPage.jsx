import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400&family=DM+Mono:wght@400;500;600&display=swap');
  .auth-root{--white:#fafaf8;--ink:#0c0c0a;--body:#2e2e2b;--muted:#8a8a85;--border:#e8e8e3;--border-2:#d4d4cc;--green:#1a3320;--green-mid:#2a4d30;--green-pale:#f0f5f0;--red:#b83232;}
  .auth-root *{box-sizing:border-box;margin:0;padding:0;}
  .auth-root{background:var(--white);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;min-height:100vh;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;}
  .auth-nav{padding:20px 48px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);background:rgba(250,250,248,0.9);backdrop-filter:blur(12px);}
  .auth-nav-logo{font-family:'Fraunces','Georgia',serif;font-size:20px;font-weight:800;letter-spacing:-0.03em;color:var(--ink);cursor:pointer;}
  .auth-nav-link{font-size:13px;color:var(--muted);cursor:pointer;background:none;border:none;font-family:inherit;font-weight:500;transition:color 0.2s;}
  .auth-nav-link:hover{color:var(--ink);}
  .auth-main{flex:1;display:flex;align-items:center;justify-content:center;padding:48px 20px;}
  .auth-wrap{display:grid;grid-template-columns:1fr 1fr;width:100%;max-width:880px;background:#fff;border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.06);}
  .auth-left{background:var(--green);padding:56px 48px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;}
  .auth-left::before{content:'Nomad';position:absolute;font-family:'Fraunces','Georgia',serif;font-size:140px;font-weight:800;color:rgba(255,255,255,0.04);bottom:-20px;right:-10px;line-height:1;pointer-events:none;letter-spacing:-0.04em;}
  .auth-kicker{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.5rem;}
  .auth-left h1{font-family:'Fraunces','Georgia',serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;line-height:1.05;color:#fff;margin-bottom:1.25rem;letter-spacing:-0.03em;}
  .auth-left h1 em{font-style:italic;font-weight:300;}
  .auth-left p{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.8;max-width:280px;}
  .auth-what-list{margin-top:2.5rem;list-style:none;}
  .auth-what-list li{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);font-size:13px;color:rgba(255,255,255,0.5);line-height:1.5;}
  .auth-what-pip{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:9px;color:rgba(255,255,255,0.5);flex-shrink:0;margin-top:1px;}
  .auth-right{padding:56px 48px;overflow-y:auto;}
  .auth-right h2{font-family:'Fraunces','Georgia',serif;font-size:28px;font-weight:700;letter-spacing:-0.03em;color:var(--ink);margin-bottom:2rem;}
  .auth-field{margin-bottom:1rem;}
  .auth-field label{display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
  .auth-field input{width:100%;background:var(--white);border:1px solid var(--border-2);border-radius:10px;color:var(--ink);padding:13px 16px;font-family:inherit;font-size:15px;font-weight:500;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
  .auth-field input:focus{border-color:var(--green-mid);box-shadow:0 0 0 3px rgba(42,77,48,0.1);}
  .auth-field input::placeholder{color:#c4c4be;}
  .auth-submit{width:100%;background:var(--green);color:#fff;border:none;border-radius:980px;padding:14px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;margin-top:0.5rem;transition:background 0.2s;letter-spacing:-0.01em;}
  .auth-submit:hover{background:var(--green-mid);}
  .auth-submit:disabled{opacity:0.6;cursor:not-allowed;}
  .auth-note{font-size:13px;color:var(--muted);margin-top:1rem;text-align:center;line-height:1.5;}
  .auth-note button{color:var(--green-mid);background:none;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;}
  .auth-terms{font-size:11px;color:var(--muted);margin-top:0.75rem;text-align:center;line-height:1.6;}
  .auth-error{font-size:13px;color:var(--red);margin-top:0.75rem;text-align:center;font-weight:500;}
  .auth-footer{padding:20px 48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:#fff;}
  .auth-footer p{font-size:13px;color:var(--muted);}
  .auth-footer button{font-size:13px;color:var(--muted);background:none;border:none;cursor:pointer;font-family:inherit;font-weight:500;transition:color 0.2s;}
  .auth-footer button:hover{color:var(--ink);}
  @media(max-width:700px){.auth-nav{padding:16px 20px;}.auth-wrap{grid-template-columns:1fr;}.auth-left{display:none;}.auth-right{padding:40px 28px;}.auth-footer{padding:16px 20px;}}
`;

export default function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password });
      navigate("/onboarding");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <style>{styles}</style>

      <nav className="auth-nav">
        <div className="auth-nav-logo" onClick={() => navigate("/")}>Nomad</div>
        <button className="auth-nav-link" onClick={() => navigate("/login")}>
          Already have an account? Log in →
        </button>
      </nav>

      <div className="auth-main">
        <div className="auth-wrap">
          <div className="auth-left">
            <div>
              <p className="auth-kicker">Start your record</p>
              <h1>Your discipline<br/>starts <em>today.</em></h1>
              <p>Your first lock starts your record. Everything that follows is built on what you actually do — not what you intend.</p>
              <ul className="auth-what-list">
                {[
                  "Time-locked deposits that build your score",
                  "Behavioral credit record lenders can read",
                  "Closed loop — your money only returns to you",
                  "Financial services matched to your score",
                ].map((item, i) => (
                  <li key={i}>
                    <span className="auth-what-pip">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="auth-right">
            <h2>Create account</h2>
            <div className="auth-field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating account..." : "Create my account"}
            </button>
            <p className="auth-note">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")}>Log in</button>
            </p>
            <p className="auth-terms">
              By signing up you agree to read the conduct rules and operate within them.
            </p>
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        <button onClick={() => navigate("/")}>← Back to Nomad</button>
        <p>© 2025 Nomad — Behavioral finance infrastructure for Africa</p>
      </footer>
    </div>
  );
}