import { settingsCopy } from "../../content/settingsCopy.js";
import SettingsSection from "../../components/settings/SettingsSection.jsx";
import SettingsItem from "../../components/settings/SettingsItem.jsx";

export default function SecurityPage() {
  return (
    <div className="page">
      <h2 className="textTitle">{settingsCopy.security.title}</h2>
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
    </div>
  );
}
