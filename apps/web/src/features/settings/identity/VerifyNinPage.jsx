import { useState } from "react";
import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function VerifyNinPage() {
  const [nin, setNin] = useState("");
  const isComplete = nin.length === 11;

  const handleChange = (event) => {
    setNin(event.target.value.replace(/\D/g, "").slice(0, 11));
  };

  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.identity.ninRequired}</p>
        <p className="hint">{settingsCopy.identity.ninDescription}</p>
        <div className="authForm">
          <label>National Identification Number (NIN)</label>
          <input className="input" inputMode="numeric" value={nin} onChange={handleChange} />
          <p className={`bvnCounter ${isComplete ? "bvnCounterOk" : ""}`}>
            {nin.length} / 11
          </p>
          <button className="primary" type="button" disabled={!isComplete}>
            Verify NIN
          </button>
        </div>
      </div>
    </div>
  );
}

