import { settingsCopy } from "../../../content/settingsCopy.js";

export default function LockRulesPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.rules.title}</p>
        <p className="hint">{settingsCopy.rules.description}</p>
        <div className="settingsList">
          {settingsCopy.rules.tiers.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
          {settingsCopy.rules.notes.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

