import { settingsCopy } from "../../../content/settingsCopy.js";

export default function SupportPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.support.title}</p>
        <p className="hint">{settingsCopy.support.helper}</p>
        <div className="actions">
          <button className="primary" type="button">
            {settingsCopy.support.contact}
          </button>
        </div>
      </div>
    </div>
  );
}

