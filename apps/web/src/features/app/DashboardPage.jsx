import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../../state/AccountContext.jsx";
import { useDashboard } from "../../state/DashboardContext.jsx";
import { useAuth } from "../../state/AuthContext.jsx";
import { useEffect } from "react";
import NomadShell from "../../components/NomadShell.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";

const styles = `
  .db-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e8e8e3;border:1px solid #e8e8e3;margin-bottom:32px;}
  .db-stat{background:#fff;padding:28px 24px;}
  .db-stat-label{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a85;font-weight:700;margin-bottom:10px;}
  .db-stat-val{font-family:'Fraunces','Georgia',serif;font-size:clamp(28px,3vw,40px);font-weight:800;letter-spacing:-0.03em;line-height:1;color:#0c0c0a;margin-bottom:6px;}
  .db-stat-val.green{color:#2a5030;}
  .db-stat-sub{font-size:12px;color:#8a8a85;font-weight:500;}
  .db-notif{border:1px solid #e8e8e3;margin-bottom:32px;}
  .db-notif-row{display:flex;align-items:flex-start;gap:14px;padding:14px 24px;border-bottom:1px solid #e8e8e3;cursor:pointer;transition:background 0.15s;}
  .db-notif-row:last-child{border-bottom:none;}
  .db-notif-row:hover{background:#fafaf8;}
  .db-notif-dot{width:7px;height:7px;border-radius:50%;margin-top:5px;flex-shrink:0;}
  .db-notif-dot.urgent{background:#2a4d30;}
  .db-notif-dot.info{background:#d4d4cc;}
  .db-notif-text{font-size:13px;color:#0c0c0a;line-height:1.6;flex:1;font-weight:500;}
  .db-notif-time{font-size:11px;color:#8a8a85;white-space:nowrap;margin-top:2px;font-weight:500;}
  .db-accounts{border:1px solid #e8e8e3;margin-bottom:32px;}
  .db-account-row{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid #e8e8e3;gap:16px;}
  .db-account-row:last-child{border-bottom:none;}
  .db-account-bank{font-size:14px;color:#0c0c0a;font-weight:700;letter-spacing:-0.01em;}
  .db-account-num{font-size:12px;color:#8a8a85;margin-top:2px;font-weight:500;}
  .db-account-badge{font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#2a5030;border:1px solid rgba(42,77,48,0.3);padding:4px 12px;font-weight:700;border-radius:980px;background:#f0f5f0;}
  .db-add-btn{display:flex;align-items:center;gap:8px;padding:14px 24px;font-size:13px;color:#8a8a85;cursor:pointer;transition:color 0.15s;font-weight:600;background:none;border:none;border-top:1px solid #e8e8e3;font-family:inherit;width:100%;text-align:left;}
  .db-add-btn:hover{color:#0c0c0a;}
  .db-empty-accounts{padding:20px 24px;font-size:13px;color:#8a8a85;font-weight:500;}
  .db-two-col{display:grid;grid-template-columns:1fr 360px;gap:32px;}
  .db-lock-list{border:1px solid #e8e8e3;border-top:none;margin-bottom:28px;}
  .db-lock-row{display:grid;grid-template-columns:4px 1fr auto;align-items:center;gap:20px;padding:18px 24px;border-bottom:1px solid #e8e8e3;cursor:pointer;transition:background 0.15s;}
  .db-lock-row:last-child{border-bottom:none;}
  .db-lock-row:hover{background:#fafaf8;}
  .db-lock-bar{border-radius:2px;width:3px;height:44px;}
  .db-lock-bar.active{background:#0c0c0a;opacity:0.2;}
  .db-lock-bar.matured{background:#2a4d30;opacity:0.8;}
  .db-lock-amount{font-family:'Fraunces','Georgia',serif;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#0c0c0a;margin-bottom:3px;}
  .db-lock-meta{font-size:12px;color:#8a8a85;line-height:1.5;font-weight:500;}
  .db-lock-time{font-family:'Fraunces','Georgia',serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;text-align:right;}
  .db-lock-time.active{color:#0c0c0a;}
  .db-lock-time.matured{color:#2a5030;}
  .db-lock-status{font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:700;text-align:right;margin-top:3px;}
  .db-lock-status.active{color:#8a8a85;}
  .db-lock-status.matured{color:#2a5030;}
  .db-cta{border:1px solid #e8e8e3;padding:24px;display:flex;justify-content:space-between;align-items:center;background:#f0f5f0;gap:20px;margin-bottom:32px;}
  .db-cta-text{font-size:14px;color:#0c0c0a;font-weight:600;line-height:1.6;}
  .db-cta-text em{font-family:'Fraunces','Georgia',serif;font-style:italic;font-weight:300;font-size:16px;color:#2e2e2b;}
  .db-cta-btn{padding:10px 24px;background:#1a3320;color:#fff;font-size:12px;border:none;cursor:pointer;font-family:inherit;font-weight:700;white-space:nowrap;border-radius:980px;transition:background 0.15s;}
  .db-cta-btn:hover{background:#2a4d30;}
  .db-right{display:flex;flex-direction:column;gap:28px;}
  .db-block{border:1px solid #e8e8e3;}
  .db-block-head{padding:16px 20px;border-bottom:1px solid #e8e8e3;display:flex;justify-content:space-between;align-items:center;}
  .db-block-title{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a85;font-weight:700;}
  .db-block-link{font-size:12px;color:#8a8a85;cursor:pointer;font-weight:600;background:none;border:none;font-family:inherit;transition:color 0.15s;}
  .db-block-link:hover{color:#0c0c0a;}
  .db-block-body{padding:20px;}
  .db-score-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
  .db-score-tier{font-family:'Fraunces','Georgia',serif;font-size:28px;font-weight:300;font-style:italic;color:#0c0c0a;}
  .db-score-pts{font-family:'Fraunces','Georgia',serif;font-size:36px;font-weight:800;letter-spacing:-0.03em;color:#2a5030;}
  .db-score-bar-wrap{height:3px;background:#e8e8e3;margin-bottom:6px;}
  .db-score-bar-fill{height:100%;background:#2a4d30;}
  .db-score-bar-labels{display:flex;justify-content:space-between;font-size:11px;color:#8a8a85;font-weight:600;margin-bottom:16px;}
  .db-score-log{border-top:1px solid #e8e8e3;}
  .db-score-log-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #e8e8e3;gap:12px;}
  .db-score-log-row:last-child{border-bottom:none;}
  .db-score-log-desc{font-size:12px;color:#8a8a85;flex:1;font-weight:500;line-height:1.5;}
  .db-score-log-pts{font-family:'Fraunces','Georgia',serif;font-size:18px;font-weight:800;letter-spacing:-0.02em;}
  .db-score-log-pts.pos{color:#2a5030;}
  .db-score-log-pts.neg{color:#b83232;}
  .db-leak-total{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
  .db-leak-label{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a85;font-weight:700;}
  .db-leak-val{font-family:'Fraunces','Georgia',serif;font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#b83232;}
  .db-leak-row{display:grid;grid-template-columns:88px 1fr 56px;align-items:center;gap:10px;margin-bottom:10px;}
  .db-leak-name{font-size:12px;color:#8a8a85;font-weight:500;}
  .db-leak-track{height:2px;background:#e8e8e3;}
  .db-leak-fill{height:100%;background:#b83232;opacity:0.5;}
  .db-leak-amt{font-family:'Fraunces','Georgia',serif;font-size:14px;font-weight:700;color:#b83232;text-align:right;}
  .db-leak-cta{font-size:12px;color:#8a8a85;cursor:pointer;font-weight:600;background:none;border:none;border-bottom:1px solid #e8e8e3;font-family:inherit;padding-bottom:2px;transition:all 0.15s;}
  .db-leak-cta:hover{color:#0c0c0a;border-bottom-color:#0c0c0a;}
  @media(max-width:1100px){.db-stat-grid{grid-template-columns:1fr 1fr;}.db-two-col{grid-template-columns:1fr;}}
  @media(max-width:768px){.db-stat-grid{grid-template-columns:1fr 1fr;}.db-two-col{grid-template-columns:1fr;}}
`;

const locks = [
  { amount:"₦150,000", meta:"Locked Mar 1 · 30-day lock · Matures Mar 31", time:"17d 4h", state:"active" },
  { amount:"₦57,500",  meta:"Locked Mar 8 · 14-day lock · Matures Mar 22",  time:"8d 11h", state:"active" },
  { amount:"₦94,500",  meta:"Locked Mar 10 · 21-day lock · Matures Mar 31", time:"17d 4h", state:"active" },
  { amount:"₦85,000",  meta:"Locked Feb 20 · Matured Mar 6",                time:"Ready",  state:"matured" },
  { amount:"₦57,500",  meta:"Locked Feb 28 · Matured Mar 14",               time:"Ready",  state:"matured" },
];

const scoreLogs = [
  { desc:"47-day clean streak milestone", pts:"+15", type:"pos" },
  { desc:"₦57,500 lock matured — no breach", pts:"+5", type:"pos" },
  { desc:"Auto-relock honored — ₦85,000", pts:"+3", type:"pos" },
  { desc:"Early unlock — ₦30,000 (Jan 26)", pts:"−10", type:"neg" },
];

const leaks = [
  { name:"Betting",      amt:"₦21.6k", pct:88 },
  { name:"Food/impulse", amt:"₦16.5k", pct:67 },
  { name:"Airtime",      amt:"₦8.4k",  pct:34 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts } = useAccount();
  const { user } = useAuth();
  const { summary, refresh } = useDashboard();
  const { currency } = useCurrency();

  useEffect(() => { refresh?.(); }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday:"long", day:"numeric", month:"long", year:"numeric"
  });

  return (
    <NomadShell
      title={`${greeting()}, ${user?.name?.split(" ")[0] || "there"}`}
      sub={today}
      action={{ label:"+ New Lock", onClick:() => navigate("/app/deposit") }}
    >
      <style>{styles}</style>

      {/* STATS */}
      <div className="db-stat-grid">
        <div className="db-stat">
          <div className="db-stat-label">Locked Capital</div>
          <div className="db-stat-val">
            {summary ? formatCurrency(summary.locked?.totalAmount || 0, currency) : "₦387,000"}
          </div>
          <div className="db-stat-sub">{summary?.locked?.count || 4} active locks</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-label">Available Balance</div>
          <div className="db-stat-val green">
            {summary ? formatCurrency(summary.matured?.totalAmount || 0, currency) : "₦142,500"}
          </div>
          <div className="db-stat-sub">{summary?.matured?.count || 2} matured · ready to act</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-label">Discipline Score</div>
          <div className="db-stat-val green">245</div>
          <div className="db-stat-sub">Trusted — 105 pts to Proven</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-label">Next Maturity</div>
          <div className="db-stat-val">17d 4h</div>
          <div className="db-stat-sub">₦150,000 · matures Mar 31</div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="db-notif">
        <div className="db-notif-row">
          <div className="db-notif-dot urgent"/>
          <div className="db-notif-text">₦57,500 lock matured. Auto-relock in 5h 22m unless you act.</div>
          <div className="db-notif-time">Now</div>
        </div>
        <div className="db-notif-row">
          <div className="db-notif-dot info"/>
          <div className="db-notif-text">Loan access preview unlocked. You are now visible to partner lenders.</div>
          <div className="db-notif-time">Mar 10</div>
        </div>
      </div>

      {/* LINKED ACCOUNTS */}
      <div className="ns-section-header" style={{marginBottom:"2px"}}>
        <div className="ns-section-title">Linked Accounts</div>
        <button className="ns-link-btn" onClick={() => navigate("/app/accounts")}>Manage →</button>
      </div>
      <div className="db-accounts" style={{marginBottom:"32px"}}>
        {accounts.length === 0
          ? <div className="db-empty-accounts">No accounts linked yet</div>
          : accounts.map(acc => (
              <div className="db-account-row" key={acc.id}>
                <div>
                  <div className="db-account-bank">{acc.bankName}</div>
                  <div className="db-account-num">•••• {acc.last4}</div>
                </div>
                <div className="db-account-badge">Linked</div>
              </div>
            ))
        }
        <button className="db-add-btn" onClick={() => navigate("/app/accounts")}>
          + Add Account
        </button>
      </div>

      {/* TWO COLUMN */}
      <div className="db-two-col">

        {/* LEFT — LOCKS */}
        <div>
          <div className="ns-section-header">
            <div className="ns-section-title">Active Locks</div>
            <button className="ns-link-btn" onClick={() => navigate("/app/locks")}>View All →</button>
          </div>
          <div className="db-lock-list">
            {locks.map((lock, i) => (
              <div className="db-lock-row" key={i} onClick={() => navigate("/app/locks")}>
                <div className={`db-lock-bar ${lock.state}`}/>
                <div>
                  <div className="db-lock-amount">{lock.amount}</div>
                  <div className="db-lock-meta">{lock.meta}</div>
                </div>
                <div>
                  <div className={`db-lock-time ${lock.state}`}>{lock.time}</div>
                  <div className={`db-lock-status ${lock.state}`}>{lock.state}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="db-cta">
            <div>
              <div className="db-cta-text">Ready to lock more capital?</div>
              <div className="db-cta-text"><em>Set it once. Let it compound.</em></div>
            </div>
            <button className="db-cta-btn" onClick={() => navigate("/app/deposit")}>+ New Lock</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="db-right">

          {/* SCORE */}
          <div className="db-block">
            <div className="db-block-head">
              <div className="db-block-title">Discipline Score</div>
              <button className="db-block-link" onClick={() => navigate("/app/score")}>History →</button>
            </div>
            <div className="db-block-body">
              <div className="db-score-top">
                <div className="db-score-tier">Trusted</div>
                <div className="db-score-pts">245</div>
              </div>
              <div className="db-score-bar-wrap">
                <div className="db-score-bar-fill" style={{width:"63%"}}/>
              </div>
              <div className="db-score-bar-labels">
                <span>Trusted (150)</span>
                <span>Proven (350)</span>
              </div>
              <div className="db-score-log">
                {scoreLogs.map((log, i) => (
                  <div className="db-score-log-row" key={i}>
                    <div className="db-score-log-desc">{log.desc}</div>
                    <div className={`db-score-log-pts ${log.type}`}>{log.pts}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LEAK AUDIT */}
          <div className="db-block">
            <div className="db-block-head">
              <div className="db-block-title">Leak Audit</div>
              <button className="db-block-link" onClick={() => navigate("/app/audit")}>Full Audit →</button>
            </div>
            <div className="db-block-body">
              <div className="db-leak-total">
                <div className="db-leak-label">This month</div>
                <div className="db-leak-val">₦56,100</div>
              </div>
              {leaks.map((leak, i) => (
                <div className="db-leak-row" key={i}>
                  <div className="db-leak-name">{leak.name}</div>
                  <div className="db-leak-track">
                    <div className="db-leak-fill" style={{width:`${leak.pct}%`}}/>
                  </div>
                  <div className="db-leak-amt">{leak.amt}</div>
                </div>
              ))}
              <button className="db-leak-cta" onClick={() => navigate("/app/audit")}>
                See where your money is going →
              </button>
            </div>
          </div>

        </div>
      </div>
    </NomadShell>
  );
}