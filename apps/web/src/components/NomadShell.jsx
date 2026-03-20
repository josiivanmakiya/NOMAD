import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400&family=DM+Mono:wght@400;500;600&display=swap');

  .ns-root{
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
  .ns-root *{box-sizing:border-box;margin:0;padding:0;}
  .ns-root{background:var(--white);color:var(--ink);font-family:var(--font-body);display:flex;height:100vh;overflow:hidden;-webkit-font-smoothing:antialiased;}

  /* SIDEBAR */
  .ns-sidebar{width:240px;min-width:240px;height:100vh;border-right:1px solid var(--border);display:flex;flex-direction:column;background:#fff;z-index:10;flex-shrink:0;}
  .ns-logo-wrap{padding:28px 28px 24px;border-bottom:1px solid var(--border);}
  .ns-logo{font-family:var(--font-display);font-size:22px;font-weight:800;letter-spacing:-0.03em;color:var(--ink);display:block;}
  .ns-logo-sub{font-size:10px;letter-spacing:0.12em;color:var(--muted);text-transform:uppercase;margin-top:4px;display:block;font-weight:600;}
  .ns-nav{flex:1;padding:20px 0;}
  .ns-nav-label{font-size:10px;letter-spacing:0.12em;color:var(--muted);text-transform:uppercase;padding:0 24px 12px;display:block;font-weight:700;}
  .ns-nav-btn{display:flex;align-items:center;gap:10px;padding:11px 24px;font-size:13px;color:var(--muted);cursor:pointer;border-left:2px solid transparent;transition:all 0.15s;font-weight:600;user-select:none;background:none;border-top:none;border-right:none;border-bottom:none;width:100%;font-family:var(--font-body);text-align:left;letter-spacing:-0.01em;}
  .ns-nav-btn:hover{color:var(--ink);background:var(--white);}
  .ns-nav-btn.active{color:var(--green);border-left-color:var(--green-mid);background:var(--green-pale);font-weight:700;}
  .ns-nav-divider{height:1px;background:var(--border);margin:12px 0;}
  .ns-user{padding:20px 24px;border-top:1px solid var(--border);}
  .ns-user-name{font-size:14px;color:var(--ink);margin-bottom:4px;font-weight:700;letter-spacing:-0.01em;}
  .ns-user-tier{font-size:11px;letter-spacing:0.06em;color:var(--green-text);text-transform:uppercase;font-weight:700;}

  /* MAIN */
  .ns-main{flex:1;height:100vh;overflow-y:auto;display:flex;flex-direction:column;}
  .ns-main::-webkit-scrollbar{width:3px;}
  .ns-main::-webkit-scrollbar-thumb{background:var(--border);}

  /* TOPBAR */
  .ns-topbar{padding:20px 40px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:rgba(250,250,248,0.95);backdrop-filter:blur(12px);z-index:50;}
  .ns-topbar-title{font-family:var(--font-display);font-size:24px;font-weight:800;letter-spacing:-0.03em;color:var(--ink);}
  .ns-topbar-sub{font-size:12px;color:var(--muted);margin-top:2px;font-weight:500;}
  .ns-topbar-right{display:flex;align-items:center;gap:12px;}
  .ns-streak{display:flex;align-items:center;gap:8px;padding:7px 16px;border:1px solid var(--border-2);font-size:12px;color:var(--green-text);font-weight:700;background:var(--green-pale);}
  .ns-streak-dot{width:6px;height:6px;background:var(--green-mid);border-radius:50%;animation:ns-pulse 2s infinite;}
  @keyframes ns-pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
  .ns-primary-btn{padding:9px 22px;background:var(--green);color:#fff;font-size:12px;letter-spacing:-0.01em;border:none;cursor:pointer;font-family:var(--font-body);font-weight:700;transition:background 0.15s;border-radius:980px;}
  .ns-primary-btn:hover{background:var(--green-mid);}

  /* CONTENT */
  .ns-content{padding:40px;flex:1;}

  /* SECTION HEADERS */
  .ns-section-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--border);margin-bottom:2px;}
  .ns-section-title{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:10px;font-weight:700;}
  .ns-section-title::before{content:'';display:block;width:16px;height:1px;background:var(--border-2);}
  .ns-link-btn{font-size:12px;color:var(--muted);cursor:pointer;transition:color 0.15s;font-weight:600;background:none;border:none;font-family:var(--font-body);}
  .ns-link-btn:hover{color:var(--ink);}

  /* STAT GRID */
  .ns-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:32px;}
  .ns-stat{background:#fff;padding:28px;}
  .ns-stat-label{font-size:11px;letter-spacing:0.12em;color:var(--muted);text-transform:uppercase;margin-bottom:12px;font-weight:700;}
  .ns-stat-val{font-family:var(--font-display);font-size:clamp(28px,3vw,40px);line-height:1;letter-spacing:-0.03em;font-weight:800;}
  .ns-stat-val.white{color:var(--ink);}
  .ns-stat-val.green{color:var(--green-text);}
  .ns-stat-val.red{color:var(--red);}
  .ns-stat-sub{font-size:12px;color:var(--muted);margin-top:6px;font-weight:500;}

  /* TABLE / ROWS */
  .ns-table{border:1px solid var(--border);border-top:none;margin-bottom:32px;}
  .ns-row{display:grid;align-items:center;padding:18px 24px;border-bottom:1px solid var(--border);transition:background 0.15s;cursor:pointer;gap:16px;}
  .ns-row:last-child{border-bottom:none;}
  .ns-row:hover{background:var(--white);}
  .ns-row-amount{font-family:var(--font-display);font-size:24px;color:var(--ink);letter-spacing:-0.02em;font-weight:800;}
  .ns-row-meta{font-size:12px;color:var(--muted);line-height:1.6;font-weight:500;margin-top:2px;}

  /* BADGES */
  .ns-badge{font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:700;padding:4px 12px;border:1px solid;border-radius:980px;}
  .ns-badge.active{color:var(--ink);border-color:var(--border-2);background:#fff;}
  .ns-badge.matured{color:var(--green-text);border-color:rgba(42,77,48,0.3);background:var(--green-pale);}
  .ns-badge.locked{color:var(--ink);border-color:var(--border-2);}
  .ns-badge.released{color:var(--muted);border-color:var(--border);}

  /* COUNTDOWN */
  .ns-countdown{font-family:var(--font-display);font-size:20px;letter-spacing:-0.02em;text-align:right;font-weight:800;}
  .ns-countdown.active{color:var(--ink);}
  .ns-countdown.matured{color:var(--green-text);}

  /* EMPTY */
  .ns-empty{padding:40px 24px;text-align:center;font-size:13px;color:var(--muted);border:1px solid var(--border);border-top:none;font-weight:500;}

  /* ACTION STRIP */
  .ns-action-strip{border:1px solid var(--border);padding:24px;display:flex;justify-content:space-between;align-items:center;background:var(--green-pale);gap:20px;margin-bottom:32px;}
  .ns-action-text{font-size:14px;color:var(--ink);line-height:1.6;font-weight:600;}
  .ns-action-text em{font-family:var(--font-display);font-style:italic;font-size:16px;font-weight:300;color:var(--body);}
  .ns-action-btn{padding:10px 24px;background:var(--green);color:#fff;font-size:12px;border:none;cursor:pointer;font-family:var(--font-body);font-weight:700;white-space:nowrap;transition:all 0.15s;border-radius:980px;}
  .ns-action-btn:hover{background:var(--green-mid);}

  /* SETTINGS */
  .ns-settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:32px;}
  .ns-settings-card{background:#fff;padding:28px;cursor:pointer;transition:background 0.15s;}
  .ns-settings-card:hover{background:var(--white);}
  .ns-settings-icon{font-size:20px;margin-bottom:16px;opacity:0.4;}
  .ns-settings-title{font-size:13px;letter-spacing:-0.01em;color:var(--ink);font-weight:700;margin-bottom:6px;}
  .ns-settings-desc{font-size:12px;color:var(--muted);line-height:1.6;font-weight:500;}
  .ns-logout-btn{width:100%;padding:14px 24px;background:none;border:1px solid var(--border);color:var(--muted);font-size:12px;cursor:pointer;font-family:var(--font-body);font-weight:600;transition:all 0.15s;text-align:left;border-radius:0;}
  .ns-logout-btn:hover{border-color:var(--red);color:var(--red);}

  @media(max-width:768px){
    .ns-sidebar{display:none;}
    .ns-content{padding:20px;}
    .ns-topbar{padding:16px 20px;}
    .ns-stat-grid{grid-template-columns:1fr 1fr;}
    .ns-settings-grid{grid-template-columns:1fr;}
  }
`;

const navItems = [
  { icon:"⊞", label:"Overview",  path:"/app" },
  { icon:"◈", label:"Locks",     path:"/app/locks" },
  { icon:"↓", label:"Deposits",  path:"/app/deposits" },
  null,
  { icon:"△", label:"Score",     path:"/app/score" },
  { icon:"○", label:"Settings",  path:"/app/settings" },
];

export default function NomadShell({ title, sub, action, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      <style>{styles}</style>
      <div className="ns-root">
        <aside className="ns-sidebar">
          <div className="ns-logo-wrap">
            <span className="ns-logo">Nomad</span>
            <span className="ns-logo-sub">Capital Infrastructure</span>
          </div>
          <nav className="ns-nav">
            <span className="ns-nav-label">Navigate</span>
            {navItems.map((item, i) =>
              item === null
                ? <div key={i} className="ns-nav-divider" />
                : (
                  <button
                    key={item.path}
                    className={`ns-nav-btn${location.pathname === item.path ? " active" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span style={{opacity:0.5}}>{item.icon}</span>
                    {item.label}
                  </button>
                )
            )}
          </nav>
          <div className="ns-user">
            <div className="ns-user-name">{user?.name || "Adebayo O."}</div>
            <div className="ns-user-tier">● Trusted</div>
          </div>
        </aside>

        <main className="ns-main">
          <div className="ns-topbar">
            <div>
              <div className="ns-topbar-title">{title}</div>
              {sub && <div className="ns-topbar-sub">{sub}</div>}
            </div>
            <div className="ns-topbar-right">
              <div className="ns-streak">
                <div className="ns-streak-dot"/>
                47-day streak
              </div>
              {action && (
                <button className="ns-primary-btn" onClick={action.onClick}>
                  {action.label}
                </button>
              )}
            </div>
          </div>
          <div className="ns-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}