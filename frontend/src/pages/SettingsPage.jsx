import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { settingsCopy } from "../content/settingsCopy.js";
import SettingsSection from "../components/settings/SettingsSection.jsx";
import SettingsItem from "../components/settings/SettingsItem.jsx";

export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">{settingsCopy.root.title}</h2>
          <p className="pageSubtitle">Security, identity, and system rules.</p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          <SettingsSection title={settingsCopy.security.title}>
            <SettingsItem
              title={settingsCopy.security.changePin.title}
              description={settingsCopy.security.changePin.description}
              to="/app/settings/security/change-pin"
            />
            <SettingsItem
              title={settingsCopy.security.biometrics.title}
              description={settingsCopy.security.biometrics.description}
              to="/app/settings/security/biometrics"
            />
          </SettingsSection>

          <SettingsSection title={settingsCopy.identity.title}>
            <SettingsItem
              title={settingsCopy.identity.bvnRequired}
              description={settingsCopy.identity.bvnDescription}
              to="/app/settings/identity/verify-bvn"
            />
            <SettingsItem
              title={settingsCopy.identity.personalInfo.title}
              description={settingsCopy.identity.personalInfo.description}
              to="/app/settings/identity/personal-info"
            />
          </SettingsSection>

          <SettingsSection title={settingsCopy.banking.title}>
            <SettingsItem
              title="Manage accounts"
              description="Add bank accounts and cards used for deposits and releases."
              to="/app/accounts"
            />
            <SettingsItem
              title="Recurring deposits"
              description="Set daily, weekly, or monthly automated deductions."
              to="/app/protocols"
            />
          </SettingsSection>
        </div>

        <div className="dashboardStack">
          <SettingsSection title="Rules">
            <SettingsItem
              title={settingsCopy.rules.title}
              description={settingsCopy.rules.description}
              to="/app/settings/lock-rules"
            />
            <SettingsItem
              title="Time laws"
              description="Server-owned time, no shortcuts."
              to="/time-laws"
            />
            <SettingsItem
              title="AI permissions"
              description="Read-only AI rules."
              to="/ai-permissions"
            />
            <SettingsItem
              title="History spec"
              description="History UI + event contract."
              to="/history-spec"
            />
          </SettingsSection>

          <SettingsSection title={settingsCopy.documents.title}>
            <SettingsItem
              title={settingsCopy.documents.statement.title}
              description={settingsCopy.documents.statement.description}
              to="/app/settings/documents/statement"
            />
          </SettingsSection>

          <SettingsSection title={settingsCopy.app.title}>
            <SettingsItem
              title={settingsCopy.app.darkMode.title}
              description={settingsCopy.app.darkMode.description}
              to="/app/settings/app/dark-mode"
            />
          </SettingsSection>

          <SettingsSection title={settingsCopy.support.title}>
            <SettingsItem
              title={settingsCopy.support.contact}
              to="/app/settings/support"
            />
            <SettingsItem
              title="Contact"
              description="Official addresses and support numbers."
              to="/app/settings/contact"
            />
          </SettingsSection>

          <div className="card">
            <p className="label">{settingsCopy.session.title}</p>
            <p className="hint">{settingsCopy.session.description}</p>
            <div className="actions">
              <button className="ghost" onClick={handleLogout}>
                {settingsCopy.session.logout}
              </button>
              <Link className="ghostLink" to="/app">
                Back to safe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Settings root with minimal, single-purpose links.
 *
 * CONNECTS TO:
 * - content/settingsCopy.js
 * - components/settings/*
 *
 * USED BY:
 * - src/App.jsx (/app/settings)
 */
