import { settingsCopy } from "../../content/settingsCopy.js";
import SettingsSection from "../../components/settings/SettingsSection.jsx";
import SettingsItem from "../../components/settings/SettingsItem.jsx";

export default function DocumentsPage() {
  return (
    <div className="page">
      <h2 className="textTitle">{settingsCopy.documents.title}</h2>
      <SettingsSection title={settingsCopy.documents.title}>
        <SettingsItem
          title={settingsCopy.documents.statement.title}
          description={settingsCopy.documents.statement.description}
          to="/app/settings/documents/statement"
        />
      </SettingsSection>
    </div>
  );
}
