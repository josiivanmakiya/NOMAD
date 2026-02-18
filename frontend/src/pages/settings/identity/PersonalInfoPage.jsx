import { settingsCopy } from "../../../content/settingsCopy.js";

export default function PersonalInfoPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.identity.personalInfo.title}</p>
        <p className="hint">{settingsCopy.identity.personalInfo.description}</p>
        <div className="authForm">
          <label>Full name</label>
          <input className="input" value="Verified Name" readOnly />
          <label>Email</label>
          <input className="input" value="email@example.com" readOnly />
          <label>Phone</label>
          <input className="input" value="+234 000 000 0000" readOnly />
          <p className="hint">To change details, contact support.</p>
        </div>
      </div>
    </div>
  );
}
