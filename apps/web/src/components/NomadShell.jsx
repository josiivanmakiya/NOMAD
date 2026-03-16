import { useNavigate, useLocation } from "react-router-dom";

export const nomadStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');
  .ns-root{--black:#080808;--white:#F2EDE8;--red:#D93025;--green:#1DB954;--mid:#555;--border:#1E1E1E;--border-light:#2A2A2A;}
  .ns-root *{box-sizing:border-box;margin:0;padding:0;}
  .ns-root{background:var(--black);color:var(--white);font-family:'DM Mono',monospace;font-weight:600;display:flex;height:100vh;overflow:hidden;}
  .ns-sidebar{width:220px;min-width:220px;height:100vh;border-right:1px solid var(--border);display:flex;flex-direction:column;background:var(--black);z-index:10;flex-shrink:0;}
  .ns-logo-wrap{padding:28px 28px 24px;border-bottom:1px solid var(--border);}
  .ns-logo{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:8px;color:var(--white);display:block;}
  .ns-logo-sub{font-size:8px;letter-spacing:3px;color:var(--mid);text-transform:uppercase;margin-top:4px;display:block;font-weight:600;}
  .ns-nav{flex:1;padding:24px 0;}
  .ns-nav-label{font-size:8px;letter-spacing:5px;color:var(--mid);text-transform:uppercase;padding:0 28px 14px;display:block;font-weight:800;}
  .ns-nav-btn{display:flex;align-items:center;gap:12px;padding:14px 28px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--mid);cursor:pointer;border-left:2px solid transparent;transition:all 0.15s;font-weight:800;user-select:none;background:none;border-top:none;border-right:none;border-bottom:none;width:100%;font-family:'DM Mono',monospace;text-align:left;}
  .ns-nav-btn:hover{color:var(--white);}
  .ns-nav-btn.active{color:var(--white);border-left-color:var(--white);background:rgba(242,237,232,0.03);}
  .ns-nav-divider{height:1px;background:var(--border);margin:16px 0;}
  .ns-user{padding:20px 28px;border-top:1px solid var(--border);}
  .ns-user-name{font-size:12px;letter-spacing:1px;color:var(--white);margin-bottom:5px;font-weight:800;}
  .ns-user-tier{font-size:9px;letter-spacing:3px;color:var(--green);text-transform:uppercase;font-weight:800;}
  .ns-main{flex:1;height:100vh;overflow-y:auto;display:flex;flex-direction:column;}
  .ns-main::-webkit-scrollbar{width:3px;}
  .ns-main::-webkit-scrollbar-thumb{background:var(--border-light);}
  .ns-topbar{padding:20px 40px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:rgba(8,8,8,0.97);backdrop-filter:blur(8px);z-index:50;}
  .ns-topbar-title{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:4px;color:var(--white);}
  .ns-topbar-sub{font-size:9px;letter-spacing:3px;color:var(--mid);text-transform:uppercase;font-weight:700;margin-top:3px;}
  .ns-topbar-right{display:flex;align-items:center;gap:16px;}
  .ns-streak{display:flex;align-items:center;gap:8px;padding:7px 16px;border:1px solid var(--border-light);font-size:9px;letter-spacing:3px;color:var(--green);text-transform:uppercase;font-weight:800;}
  .ns-streak-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:ns-pulse 2s infinite;}
  @keyframes ns-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
  .ns-primary-btn{padding:9px 22px;background:var(--white);color:var(--black);font-size:9px;letter-spacing:3px;text-transform:uppercase;border:none;cursor:pointer;font-family:'DM Mono',monospace;font-weight:800;transition:background 0.15s;}
  .ns-primary-btn:hover{background:var(--green);}
  .ns-content{padding:40px;flex:1;}
  .ns-page-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4vw,56px);letter-spacing:2px;color:var(--white);margin-bottom:6px;}
  .ns-page-sub{font-size:10px;letter-spacing:3px;color:var(--mid);text-transform:uppercase;font-weight:700;margin-bottom:32px;}
  .ns-section-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--border);margin-bottom:2px;}
  .ns-section-title{font-size:9px;letter-spacing:5px;text-transform:uppercase;color:var(--mid);display:flex;align-items:center;gap:10px;font-weight:800;}
  .ns-section-title::before{content:'';display:block;width:16px;height:1px;background:var(--mid);}
  .ns-link-btn{font-size:9px;letter-spacing:2px;color:var(--mid);text-transform:uppercase;cursor:pointer;transition:color 0.15s;font-weight:800;background:none;border:none;font-family:'DM Mono',monospace;}
  .ns-link-btn:hover{color:var(--white);}
  .ns-table{border:1px solid var(--border);border-top:none;margin-bottom:32px;}
  .ns-row{display:grid;align-items:center;padding:18px 24px;border-bottom:1px solid var(--border);transition:background 0.15s;cursor:pointer;gap:16px;}
  .ns-row:last-child{border-bottom:none;}
  .ns-row:hover{background:rgba(242,237,232,0.02);}
  .ns-row-amount{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--white);letter-spacing:1px;}
  .ns-row-meta{font-size:9px;color:var(--mid);letter-spacing:1px;line-height:1.7;font-weight:600;margin-top:3px;}
  .ns-badge{font-size:8px;letter-spacing:3px;text-transform:uppercase;font-weight:800;padding:4px 10px;border:1px solid;}
  .ns-badge.active{color:var(--white);border-color:rgba(242,237,232,0.2);}
  .ns-badge.matured{color:var(--green);border-color:rgba(29,185,84,0.3);}
  .ns-badge.locked{color:var(--white);border-color:rgba(242,237,232,0.2);}
  .ns-badge.released{color:var(--mid);border-color:var(--border);}
  .ns-countdown{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;text-align:right;}
  .ns-countdown.active{color:var(--white);}
  .ns-countdown.matured{color:var(--green);}
  .ns-empty{padding:40px 24px;text-align:center;font-size:10px;color:var(--mid);letter-spacing:3px;text-transform:uppercase;border:1px solid var(--border);border-top:none;}
  .ns-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:32px;}
  .ns-stat{background:var(--black);padding:28px;}
  .ns-stat-label{font-size:8px;letter-spacing:4px;color:var(--mid);text-transform:uppercase;margin-bottom:12px;font-weight:800;}
  .ns-stat-val{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,3vw,42px);line-height:1;letter-spacing:1px;}
  .ns-stat-val.white{color:var(--white);}
  .ns-stat-val.green{color:var(--green);}
  .ns-stat-val.red{color:var(--red);}
  .ns-stat-sub{font-size:9px;color:var(--mid);letter-spacing:1px;margin-top:6px;font-weight:600;}
  .ns-action-strip{border:1px solid rgba(29,185,84,0.15);padding:20px 24px;display:flex;justify-content:space-between;align-items:center;background:rgba(29,185,84,0.03);gap:20px;margin-bottom:32px;}
  .ns-action-text{font-size:11px;color:var(--white);letter-spacing:1px;line-height:1.7;font-weight:700;}
  .ns-action-text em{font-family:'Instrument Serif',serif;font-style:italic;font-size:13px;opacity:0.6;}
  .ns-action-btn{padding:10px 24px;background:none;border:1px solid rgba(29,185,84,0.4);color:var(--green);font-size:9px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Mono',monospace;font-weight:800;white-space:nowrap;transition:all 0.15s;}
  .ns-action-btn:hover{background:var(--green);color:var(--black);border-color:var(--green);}
  .ns-settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:32px;}
  .ns-settings-card{background:var(--black);padding:28px 28px;cursor:pointer;transition:background 0.15s;}
  .ns-settings-card:hover{background:rgba(242,237,232,0.02);}
  .ns-settings-icon{font-size:20px;margin-bottom:16px;opacity:0.5;}
  .ns-settings-title{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--white);font-weight:800;margin-bottom:8px;}
  .ns-settings-desc{font-size:10px;color:var(--mid);line-height:1.7;letter-spacing:0.5px;font-weight:600;}
  .ns-logout-btn{width:100%;padding:16px 24px;background:none;border:1px solid var(--border);color:var(--mid);font-size:9px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;font-family:'DM Mono',monospace;font-weight:800;transition:all 0.15s;text-align:left;}
  .ns-logout-btn:hover{border-color:var(--red);color:var(--red);}
  @media(max-width:768px){.ns-sidebar{display:none;}.ns-content{padding:20px;}.ns-topbar{padding:16px 20px;}.ns-stat-grid{grid-template-columns:1fr 1fr;}.ns-settings-grid{grid-template-columns:1fr;}}
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

  return (
    <>
      <style>{nomadStyles}</style>
      <div className="ns-root">
        <aside className="ns-sidebar">
          <div className="ns-logo-wrap">
            <span className="ns-logo">NOMAD</span>
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
                    <span>{item.icon}</span>{item.label}
                  </button>
                )
            )}
          </nav>
          <div className="ns-user">
            <div className="ns-user-name">Adebayo O.</div>
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
                <div className="ns-streak-dot"/>47-day streak
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
