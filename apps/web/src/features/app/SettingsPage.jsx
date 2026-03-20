import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import NomadShell from "../../components/NomadShell.jsx";

const styles = `
  .st-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e8e8e3;border:1px solid #e8e8e3;margin-bottom:32px;}
  .st-card{background:#fff;padding:32px;cursor:pointer;transition:background 0.15s;}
  .st-card:hover{background:#fafaf8;}
  .st-icon{font-size:24px;margin-bottom:16px;opacity:0.35;}
  .st-title{font-size:15px;font-weight:700;color:#0c0c0a;margin-bottom:6px;letter-spacing:-0.01em;}
  .st-desc{font-size:13px;color:#8a8a85;line-height:1.6;font-weight:500;}
  .st-profile{border:1px solid #e8e8e3;padding:28px;margin-bottom:32px;background:#fff;}
  .st-profile-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid #e8e8e3;}
  .st-profile-row:last-child{border-bottom:none;}
  .st-profile-label{font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#8a8a85;}
  .st-profile-val{font-size:14px;font-weight:600;color:#0c0c0a;}
  .st-logout{width:100%;padding:14px 24px;background:#fff;border:1px solid #e8e8e3;color:#8a8a85;font-size:13px;cursor:pointer;font-family:inherit;font-weight:600;transition:all 0.15s;text-align:left;margin-bottom:32px;}
  .st-logout:hover{border-color:#b83232;color:#b83232;}
  @media(max-width:768px){.st-grid{grid-template-columns:1fr;}}
`;

const settingsItems = [
  { icon:"🔒", title:"Security",   desc:"PIN, 2FA, biometrics",               path:"/app/settings/security" },
  { icon:"👤", title:"Identity",   desc:"BVN, NIN, personal information",      path:"/app/settings/identity" },
  { icon:"🏦", title:"Banking",    desc:"Funding and withdrawal accounts",     path:"/app/accounts" },
  { icon:"📄", title:"Documents",  desc:"Statements and transaction records",  path:"/app/settings/documents" },
  { icon:"⚙️", title:"Lock Rules", desc:"Default durations and lock behavior", path:"/app/settings/lock-rules" },
  { icon:"💬", title:"Support",    desc:"Contact us and get help",             path:"/app/settings/support" },
];

export default function SettingsPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <NomadShell title="Settings" sub="Account and preferences">
      <style>{styles}</style>

      {/* PROFILE SUMMARY */}
      <div className="ns-section-header" style={{marginBottom:"2px"}}>
        <div className="ns-section-title">Your Profile</div>
      </div>
      <div className="st-profile">
        <div className="st-profile-row">
          <div className="st-profile-label">Name</div>
          <div className="st-profile-val">{user?.name || "—"}</div>
        </div>
        <div className="st-profile-row">
          <div className="st-profile-label">Email</div>
          <div className="st-profile-val">{user?.email || "—"}</div>
        </div>
        <div className="st-profile-row">
          <div className="st-profile-label">Account tier</div>
          <div className="st-profile-val">Tier {user?.tier || 0}</div>
        </div>
        <div className="st-profile-row">
          <div className="st-profile-label">Phone</div>
          <div className="st-profile-val">{user?.phoneNumber || "Not set"}</div>
        </div>
      </div>

      {/* SETTINGS GRID */}
      <div className="ns-section-header" style={{marginBottom:"2px"}}>
        <div className="ns-section-title">Manage</div>
      </div>
      <div className="st-grid">
        {settingsItems.map(item => (
          <div key={item.path} className="st-card"
            onClick={() => navigate(item.path)}>
            <div className="st-icon">{item.icon}</div>
            <div className="st-title">{item.title}</div>
            <div className="st-desc">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button className="st-logout" onClick={handleLogout}>
        → Sign out of Nomad
      </button>
    </NomadShell>
  );
}