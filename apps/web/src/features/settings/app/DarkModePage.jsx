import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function DarkModePage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.app.darkMode.title}</p>
        <p className="hint">{settingsCopy.app.darkMode.description}</p>
        <div className="actions">
          <button className="ghost" type="button">
            Enable dark mode
          </button>
          <button className="ghost" type="button">
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}

