import { settingsCopy } from "../../content/settingsCopy.js";
import SettingsSection from "../../components/settings/SettingsSection.jsx";
import SettingsItem from "../../components/settings/SettingsItem.jsx";

export default function IdentityPage() {
  return (
    <div className="page">
      <h2 className="textTitle">{settingsCopy.identity.title}</h2>
      <SettingsSection title={settingsCopy.identity.title}>
        <SettingsItem
          title={settingsCopy.identity.bvnRequired}
          description={settingsCopy.identity.bvnDescription}
          to="/app/settings/identity/verify-bvn"
        />
        <SettingsItem
          title={settingsCopy.identity.ninRequired}
          description={settingsCopy.identity.ninDescription}
          to="/app/settings/identity/verify-nin"
        />
        <SettingsItem
          title={settingsCopy.identity.personalInfo.title}
          description={settingsCopy.identity.personalInfo.description}
          to="/app/settings/identity/personal-info"
        />
      </SettingsSection>
    </div>
  );
}
