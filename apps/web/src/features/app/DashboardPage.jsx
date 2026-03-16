import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../../state/AccountContext.jsx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');
  .nd-root{--black:#080808;--white:#F2EDE8;--red:#D93025;--green:#1DB954;--dim:#161616;--mid:#555;--border:#1E1E1E;--border-light:#2A2A2A;}
  .nd-root *{box-sizing:border-box;margin:0;padding:0;}
  .nd-root{background:var(--black);color:var(--white);font-family:'DM Mono',monospace;font-weight:500;display:flex;height:100vh;overflow:hidden;}
  .nd-sidebar{width:220px;min-width:220px;height:100vh;border-right:1px solid var(--border);display:flex;flex-direction:column;background:var(--black);z-index:10;}
  .nd-sidebar-logo{padding:28px 28px 24px;border-bottom:1px solid var(--border);}
  .nd-logo-text{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:7px;color:var(--white);display:block;}
  .nd-logo-sub{font-size:8px;letter-spacing:3px;color:var(--mid);text-transform:uppercase;margin-top:4px;display:block;}
  .nd-sidebar-nav{flex:1;padding:24px 0;}
  .nd-nav-label{font-size:8px;letter-spacing:5px;color:var(--mid);text-transform:uppercase;padding:0 28px 14px;display:block;font-weight:700;}
  .nd-nav-item{display:flex;align-items:center;gap:12px;padding:13px 28px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--mid);cursor:pointer;border-left:2px solid transparent;transition:all 0.15s;font-weight:700;user-select:none;background:none;border-top:none;border-right:none;border-bottom:none;width:100%;font-family:'DM Mono',monospace;text-align:left;}
  .nd-nav-item:hover{color:var(--white);}
  .nd-nav-item.active{color:var(--white);border-left-color:var(--white);background:rgba(242,237,232,0.03);}
  .nd-nav-divider{height:1px;background:var(--border);margin:16px 0;}
  .nd-sidebar-user{padding:20px 28px;border-top:1px solid var(--border);}
  .nd-user-name{font-size:12px;letter-spacing:1px;color:var(--white);margin-bottom:5px;font-weight:700;}
  .nd-user-tier{font-size:9px;letter-spacing:3px;color:var(--green);text-transform:uppercase;font-weight:700;}
  .nd-main{flex:1;height:100vh;overflow-y:auto;display:flex;flex-direction:column;}
  .nd-main::-webkit-scrollbar{width:3px;}
  .nd-main::-webkit-scrollbar-thumb{background:var(--border-light);}
  .nd-topbar{padding:20px 40px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:rgba(8,8,8,0.97);backdrop-filter:blur(8px);z-index:50;}
  .nd-topbar-greeting{font-size:9px;letter-spacing:4px;color:var(--mid);text-transform:uppercase;font-weight:700;margin-bottom:3px;}
  .nd-topbar-date{font-size:12px;color:var(--white);letter-spacing:1px;font-weight:700;}
  .nd-topbar-right{display:flex;align-items:center;gap:20px;}
  .nd-streak-badge{display:flex;align-items:center;gap:8px;padding:7px 16px;border:1px solid var(--border-light);font-size:9px;letter-spacing:3px;color:var(--green);text-transform:uppercase;font-weight:700;}
  .nd-streak-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:nd-pulse 2s infinite;}
  @keyframes nd-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
  .nd-new-lock-btn{padding:9px 22px;background:var(--white);color:var(--black);font-size:9px;letter-spacing:3px;text-transform:uppercase;border:none;cursor:pointer;font-family:'DM Mono',monospace;font-weight:700;transition:background 0.15s;}
  .nd-new-lock-btn:hover{background:var(--green);}
  .nd-content{padding:40px;flex:1;}
  .nd-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:28px;}
  .nd-stat-card{background:var(--black);padding:28px 28px 24px;position:relative;overflow:hidden;}
  .nd-stat-card::after{content:attr(data-bg);position:absolute;bottom:-8px;right:12px;font-family:'Bebas Neue',sans-serif;font-size:56px;color:rgba(255,255,255,0.03);pointer-events:none;}
  .nd-stat-label{font-size:8px;letter-spacing:4px;color:var(--mid);text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:8px;font-weight:700;}
  .nd-stat-dot{width:4px;height:4px;border-radius:50%;}
  .nd-stat-value{font-family:'Bebas Neue',sans-serif;font-size:clamp(30px,3vw,44px);line-height:1;margin-bottom:8px;letter-spacing:1px;}
  .nd-stat-value.green{color:var(--green);}
  .nd-stat-value.white{color:var(--white);}
  .nd-stat-countdown{font-family:'Bebas Neue',sans-serif;font-size:clamp(24px,2.5vw,36px);color:var(--white);line-height:1;margin-bottom:8px;}
  .nd-stat-sub{font-size:9px;color:var(--mid);letter-spacing:1px;line-height:1.6;font-weight:500;}
  .nd-notif-strip{border:1px solid var(--border);margin-bottom:28px;}
  .nd-notif-row{display:flex;align-items:flex-start;gap:14px;padding:14px 24px;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;}
  .nd-notif-row:last-child{border-bottom:none;}
  .nd-notif-row:hover{background:rgba(242,237,232,0.02);}
  .nd-notif-dot{width:6px;height:6px;border-radius:50%;margin-top:5px;flex-shrink:0;}
  .nd-notif-dot.urgent{background:var(--green);}
  .nd-notif-dot.info{background:var(--mid);}
  .nd-notif-text{font-size:11px;color:var(--white);letter-spacing:0.5px;line-height:1.7;flex:1;font-weight:500;}
  .nd-notif-time{font-size:8px;color:var(--mid);letter-spacing:2px;white-space:nowrap;margin-top:3px;}
  .nd-two-col{display:grid;grid-template-columns:1fr 360px;gap:28px;}
  .nd-section-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:2px;}
  .nd-section-title{font-size:9px;letter-spacing:5px;text-transform:uppercase;color:var(--mid);display:flex;align-items:center;gap:10px;font-weight:700;}
  .nd-section-title::before{content:'';display:block;width:16px;height:1px;background:var(--mid);}
  .nd-section-link{font-size:9px;letter-spacing:2px;color:var(--mid);text-transform:uppercase;cursor:pointer;transition:color 0.15s;font-weight:700;background:none;border:none;font-family:'DM Mono',monospace;}
  .nd-section-link:hover{color:var(--white);}
  .nd-lock-list{border:1px solid var(--border);border-top:none;}
  .nd-lock-row{display:grid;grid-template-columns:6px 1fr auto;align-items:center;gap:20px;padding:18px 24px;border-bottom:1px solid var(--border);transition:background 0.15s;cursor:pointer;}
  .nd-lock-row:last-child{border-bottom:none;}
  .nd-lock-row:hover{background:rgba(242,237,232,0.02);}
  .nd-lock-indicator{width:3px;height:44px;border-radius:2px;}
  .nd-lock-indicator.active{background:var(--white);opacity:0.35;}
  .nd-lock-indicator.matured{background:var(--green);opacity:0.8;}
  .nd-lock-amount{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--white);margin-bottom:4px;letter-spacing:1px;}
  .nd-lock-meta{font-size:9px;color:var(--mid);letter-spacing:1px;line-height:1.6;font-weight:500;}
  .nd-lock-countdown{font-family:'Bebas Neue',sans-serif;font-size:20px;text-align:right;letter-spacing:1px;}
  .nd-lock-countdown.active{color:var(--white);}
  .nd-lock-countdown.matured{color:var(--green);}
  .nd-lock-status{font-size:8px;letter-spacing:3px;text-transform:uppercase;text-align:right;margin-top:3px;font-weight:700;}
  .nd-lock-status.active{color:var(--mid);}
  .nd-lock-status.matured{color:var(--green);}
  .nd-quick-lock-strip{border:1px solid rgba(29,185,84,0.15);padding:20px 24px;display:flex;justify-content:space-between;align-items:center;margin-top:28px;background:rgba(29,185,84,0.03);gap:20px;}
  .nd-quick-lock-text{font-size:11px;color:var(--white);letter-spacing:1px;line-height:1.7;font-weight:500;}
  .nd-quick-lock-text em{font-family:'Instrument Serif',serif;font-style:italic;font-size:14px;opacity:0.7;}
  .nd-quick-lock-action{padding:10px 24px;background:none;border:1px solid rgba(29,185,84,0.4);color:var(--green);font-size:9px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Mono',monospace;font-weight:700;white-space:nowrap;transition:all 0.15s;}
  .nd-quick-lock-action:hover{background:var(--green);color:var(--black);border-color:var(--green);}
  .nd-right-col{display:flex;flex-direction:column;gap:28px;}
  .nd-block{border:1px solid var(--border);}
  .nd-block-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
  .nd-block-body{padding:20px;}
  .nd-score-tier{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
  .nd-score-tier-name{font-family:'Instrument Serif',serif;font-style:italic;font-size:30px;color:var(--white);}
  .nd-score-pts{font-family:'Bebas Neue',sans-serif;font-size:38px;color:var(--green);letter-spacing:1px;}
  .nd-score-bar-wrap{height:2px;background:var(--border-light);margin-bottom:8px;}
  .nd-score-bar-fill{height:100%;background:var(--green);}
  .nd-score-bar-labels{display:flex;justify-content:space-between;font-size:8px;color:var(--mid);letter-spacing:1px;margin-bottom:16px;font-weight:700;}
  .nd-score-log{border-top:1px solid var(--border);}
  .nd-score-log-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);gap:12px;}
  .nd-score-log-item:last-child{border-bottom:none;}
  .nd-score-log-desc{font-size:9px;color:var(--mid);letter-spacing:0.5px;line-height:1.6;flex:1;font-weight:500;}
  .nd-score-log-pts{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:1px;white-space:nowrap;}
  .nd-score-log-pts.pos{color:var(--green);}
  .nd-score-log-pts.neg{color:var(--red);}
  .nd-leak-total-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
  .nd-leak-total-label{font-size:9px;color:var(--mid);letter-spacing:3px;text-transform:uppercase;font-weight:700;}
  .nd-leak-total-value{font-family:'Bebas Neue',sans-serif;font-size:30px;color:var(--red);letter-spacing:1px;}
  .nd-leak-bar-row{display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
  .nd-leak-item{display:grid;grid-template-columns:84px 1fr 56px;align-items:center;gap:10px;}
  .nd-leak-item-label{font-size:9px;color:var(--mid);letter-spacing:1px;white-space:nowrap;font-weight:500;}
  .nd-leak-bar-bg{height:2px;background:var(--border-light);}
  .nd-leak-bar-fill{height:100%;background:var(--red);opacity:0.55;}
  .nd-leak-item-val{font-family:'Bebas Neue',sans-serif;font-size:14px;color:var(--red);text-align:right;opacity:0.8;}
  .nd-leak-cta{font-size:9px;letter-spacing:2px;color:var(--mid);text-transform:uppercase;cursor:pointer;border-bottom:1px solid var(--border);padding-bottom:2px;transition:all 0.15s;font-weight:700;background:none;border-top:none;border-left:none;border-right:none;font-family:'DM Mono',monospace;display:inline-block;}
  .nd-leak-cta:hover{color:var(--white);border-bottom-color:var(--white);}
  .nd-accounts-strip{border:1px solid var(--border);margin-bottom:28px;}
  .nd-account-row{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid var(--border);gap:16px;}
  .nd-account-row:last-child{border-bottom:none;}
  .nd-account-bank{font-size:11px;color:var(--white);font-weight:700;letter-spacing:1px;}
  .nd-account-number{font-size:9px;color:var(--mid);letter-spacing:2px;margin-top:3px;}
  .nd-account-badge{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(--green);border:1px solid rgba(29,185,84,0.3);padding:3px 10px;font-weight:700;}
  .nd-add-account-btn{display:flex;align-items:center;gap:10px;padding:14px 24px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--mid);cursor:pointer;transition:all 0.15s;font-weight:700;background:none;border:none;border-top:1px solid var(--border);font-family:'DM Mono',monospace;width:100%;text-align:left;}
  .nd-add-account-btn:hover{color:var(--white);}
  .nd-empty-accounts{padding:20px 24px;font-size:10px;color:var(--mid);letter-spacing:2px;text-transform:uppercase;}
  @media(max-width:1100px){.nd-stat-grid{grid-template-columns:1fr 1fr;}.nd-two-col{grid-template-columns:1fr;}}
  @media(max-width:768px){.nd-sidebar{display:none;}.nd-content{padding:20px;}.nd-topbar{padding:16px 20px;}}
`;

const locks = [
  { amount:"₦150,000", meta:"Locked Mar 1 · 30-day lock · Matures Mar 31", countdown:"17d 4h", state:"active" },
  { amount:"₦57,500",  meta:"Locked Mar 8 · 14-day lock · Matures Mar 22",  countdown:"8d 11h", state:"active" },
  { amount:"₦94,500",  meta:"Locked Mar 10 · 21-day lock · Matures Mar 31", countdown:"17d 4h", state:"active" },
  { amount:"₦85,000",  meta:"Locked Feb 20 · 14-day lock · Matured Mar 6",  countdown:"Ready",  state:"matured" },
  { amount:"₦57,500",  meta:"Locked Feb 28 · 14-day lock · Matured Mar 14", countdown:"Ready",  state:"matured" },
];

const scoreLogs = [
  { desc:"47-day clean streak milestone",    pts:"+15", type:"pos" },
  { desc:"₦57,500 lock matured — no breach", pts:"+5",  type:"pos" },
  { desc:"Auto-relock honored — ₦85,000",    pts:"+3",  type:"pos" },
  { desc:"Early unlock — ₦30,000 (Jan 26)",  pts:"−10", type:"neg" },
];

const leaks = [
  { label:"Betting",      val:"₦21.6k", pct:88 },
  { label:"Food/impulse", val:"₦16.5k", pct:67 },
  { label:"Airtime",      val:"₦8.4k",  pct:34 },
];

const navItems = [
  { icon:"⊞", label:"Overview",  path:"/app" },
  { icon:"◈", label:"Locks",     path:"/app/locks" },
  { icon:"↓", label:"Deposits",  path:"/app/deposits" },
  null,
  { icon:"△", label:"Score",     path:"/app/home" },
  { icon:"○", label:"Settings",  path:"/app/settings" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts } = useAccount();

  return (
    <>
      <style>{styles}</style>
      <div className="nd-root">

        {/* SIDEBAR */}
        <aside className="nd-sidebar">
          <div className="nd-sidebar-logo">
            <span className="nd-logo-text">NOMAD</span>
            <span className="nd-logo-sub">Capital Infrastructure</span>
          </div>
          <nav className="nd-sidebar-nav">
            <span className="nd-nav-label">Navigate</span>
            {navItems.map((item, i) =>
              item === null
                ? <div key={i} className="nd-nav-divider" />
                : (
                  <button
                    key={item.path}
                    className={`nd-nav-item${location.pathname === item.path ? " active" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span>{item.icon}</span>{item.label}
                  </button>
                )
            )}
          </nav>
          <div className="nd-sidebar-user">
            <div className="nd-user-name">Adebayo O.</div>
            <div className="nd-user-tier">● Trusted</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="nd-main">

          {/* TOPBAR */}
          <div className="nd-topbar">
            <div>
              <div className="nd-topbar-greeting">Good morning</div>
              <div className="nd-topbar-date">Saturday, 14 March 2026</div>
            </div>
            <div className="nd-topbar-right">
              <div className="nd-streak-badge">
                <div className="nd-streak-dot"/>47-day streak
              </div>
              <button className="nd-new-lock-btn" onClick={() => navigate("/app/deposit")}>
                + New Lock
              </button>
            </div>
          </div>

          <div className="nd-content">

            {/* STAT GRID */}
            <div className="nd-stat-grid">
              {[
                { bg:"LOCKED", dot:"var(--white)",  label:"Locked Capital",   val:"₦387,000", cls:"white", sub:"4 active locks" },
                { bg:"AVAIL",  dot:"var(--green)",  label:"Available Balance", val:"₦142,500", cls:"green", sub:"2 matured · ready to act" },
                { bg:"SCORE",  dot:"var(--green)",  label:"Discipline Score",  val:"245",      cls:"green", sub:"Trusted — 105 pts to Proven" },
              ].map(s => (
                <div className="nd-stat-card" key={s.label} data-bg={s.bg}>
                  <div className="nd-stat-label">
                    <span className="nd-stat-dot" style={{background:s.dot}}/>
                    {s.label}
                  </div>
                  <div className={`nd-stat-value ${s.cls}`}>{s.val}</div>
                  <div className="nd-stat-sub">{s.sub}</div>
                </div>
              ))}
              <div className="nd-stat-card" data-bg="NEXT">
                <div className="nd-stat-label">
                  <span className="nd-stat-dot" style={{background:"var(--mid)"}}/>
                  Next Maturity
                </div>
                <div className="nd-stat-countdown">17d 4h</div>
                <div className="nd-stat-sub">₦150,000 · matures Mar 31</div>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="nd-notif-strip">
              <div className="nd-notif-row">
                <div className="nd-notif-dot urgent"/>
                <div className="nd-notif-text">₦57,500 lock matured. Auto-relock in 5h 22m unless you act.</div>
                <div className="nd-notif-time">Now</div>
              </div>
              <div className="nd-notif-row">
                <div className="nd-notif-dot info"/>
                <div className="nd-notif-text">Loan access preview unlocked. You are now visible to partner lenders.</div>
                <div className="nd-notif-time">Mar 10</div>
              </div>
            </div>

            {/* LINKED ACCOUNTS */}
            <div className="nd-section-header" style={{marginBottom:"2px"}}>
              <div className="nd-section-title">Linked Accounts</div>
              <button className="nd-section-link" onClick={() => navigate("/app/accounts")}>Manage →</button>
            </div>
            <div className="nd-accounts-strip">
              {accounts.length === 0
                ? <div className="nd-empty-accounts">No accounts linked yet</div>
                : accounts.map(acc => (
                    <div className="nd-account-row" key={acc.id}>
                      <div>
                        <div className="nd-account-bank">{acc.bankName}</div>
                        <div className="nd-account-number">•••• {acc.last4}</div>
                      </div>
                      <div className="nd-account-badge">Linked</div>
                    </div>
                  ))
              }
              <button className="nd-add-account-btn" onClick={() => navigate("/app/accounts")}>
                + Add Account
              </button>
            </div>

            {/* TWO COLUMN */}
            <div className="nd-two-col">

              {/* LEFT: LOCKS */}
              <div>
                <div className="nd-section-header">
                  <div className="nd-section-title">Active Locks</div>
                  <button className="nd-section-link" onClick={() => navigate("/app/locks")}>View All →</button>
                </div>
                <div className="nd-lock-list">
                  {locks.map((lock, i) => (
                    <div className="nd-lock-row" key={i}>
                      <div className={`nd-lock-indicator ${lock.state}`}/>
                      <div>
                        <div className="nd-lock-amount">{lock.amount}</div>
                        <div className="nd-lock-meta">{lock.meta}</div>
                      </div>
                      <div>
                        <div className={`nd-lock-countdown ${lock.state}`}>{lock.countdown}</div>
                        <div className={`nd-lock-status ${lock.state}`}>{lock.state}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="nd-quick-lock-strip">
                  <div>
                    <div className="nd-quick-lock-text">Ready to lock more capital?</div>
                    <div className="nd-quick-lock-text"><em>Set it once. Let it compound.</em></div>
                  </div>
                  <button className="nd-quick-lock-action" onClick={() => navigate("/app/deposit")}>+ New Lock</button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="nd-right-col">

                <div className="nd-block">
                  <div className="nd-block-header">
                    <div className="nd-section-title">Discipline Score</div>
                    <button className="nd-section-link" onClick={() => navigate("/app/home")}>History →</button>
                  </div>
                  <div className="nd-block-body">
                    <div className="nd-score-tier">
                      <div className="nd-score-tier-name">Trusted</div>
                      <div className="nd-score-pts">245</div>
                    </div>
                    <div className="nd-score-bar-wrap">
                      <div className="nd-score-bar-fill" style={{width:"63.3%"}}/>
                    </div>
                    <div className="nd-score-bar-labels">
                      <span>Trusted (150)</span>
                      <span>105 pts to Proven</span>
                      <span>Proven (350)</span>
                    </div>
                    <div className="nd-score-log">
                      {scoreLogs.map((log, i) => (
                        <div className="nd-score-log-item" key={i}>
                          <div className="nd-score-log-desc">{log.desc}</div>
                          <div className={`nd-score-log-pts ${log.type}`}>{log.pts}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="nd-block">
                  <div className="nd-block-header">
                    <div className="nd-section-title">Leak Audit</div>
                    <button className="nd-section-link" onClick={() => navigate("/app/audit")}>Full Audit →</button>
                  </div>
                  <div className="nd-block-body">
                    <div className="nd-leak-total-row">
                      <div className="nd-leak-total-label">This month</div>
                      <div className="nd-leak-total-value">₦56,100</div>
                    </div>
                    <div className="nd-leak-bar-row">
                      {leaks.map((leak, i) => (
                        <div className="nd-leak-item" key={i}>
                          <div className="nd-leak-item-label">{leak.label}</div>
                          <div className="nd-leak-bar-bg">
                            <div className="nd-leak-bar-fill" style={{width:`${leak.pct}%`}}/>
                          </div>
                          <div className="nd-leak-item-val">{leak.val}</div>
                        </div>
                      ))}
                    </div>
                    <button className="nd-leak-cta" onClick={() => navigate("/app/audit")}>
                      See where your money is going →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


