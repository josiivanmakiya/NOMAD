import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import NomadShell from "../../components/NomadShell.jsx";

const settingsItems = [
  { icon:"◈", title:"Security",  desc:"PIN, 2FA, biometrics",               path:"/app/settings/security" },
  { icon:"⊙", title:"Identity",  desc:"BVN, NIN, personal info",             path:"/app/settings/identity" },
  { icon:"↓", title:"Banking",   desc:"Funding and withdrawal accounts",     path:"/app/settings/banking" },
  { icon:"≡", title:"Documents", desc:"Statements and records",              path:"/app/settings/documents" },
  { icon:"△", title:"Lock Rules",desc:"Default lock durations and behavior", path:"/app/settings/lock-rules" },
  { icon:"○", title:"Support",   desc:"Contact and help",                    path:"/app/settings/support" },
];

export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <NomadShell title="SETTINGS" sub="Account and preferences">
      <div className="ns-settings-grid">
        {settingsItems.map(item => (
          <div
            key={item.path}
            className="ns-settings-card"
            onClick={() => navigate(item.path)}
          >
            <div className="ns-settings-icon">{item.icon}</div>
            <div className="ns-settings-title">{item.title}</div>
            <div className="ns-settings-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <button className="ns-logout-btn" onClick={handleLogout}>
        → Exit Session
      </button>
    </NomadShell>
  );
}
