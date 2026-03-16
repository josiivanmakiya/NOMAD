import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function BiometricsPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.security.biometrics.title}</p>
        <p className="hint">{settingsCopy.security.biometrics.description}</p>
        <div className="actions">
          <button className="ghost" type="button">
            Enable biometrics
          </button>
          <button className="ghost" type="button">
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}

