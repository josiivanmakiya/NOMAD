import { settingsCopy } from "../../../content/settingsCopy.js";
import SettingsSection from "../../../components/settings/SettingsSection.jsx";
import SettingsItem from "../../../components/settings/SettingsItem.jsx";

export default function BankingPage() {
  return (
    <div className="page">
      <h2 className="textTitle">{settingsCopy.banking.title}</h2>
      <SettingsSection title={settingsCopy.banking.title}>
        <SettingsItem
          title={settingsCopy.banking.funding.title}
          description={settingsCopy.banking.funding.description}
          to="/app/settings/banking/funding"
        />
        <SettingsItem
          title={settingsCopy.banking.withdrawal.title}
          description={settingsCopy.banking.withdrawal.description}
          to="/app/settings/banking/withdrawal"
        />
      </SettingsSection>
    </div>
  );
}

