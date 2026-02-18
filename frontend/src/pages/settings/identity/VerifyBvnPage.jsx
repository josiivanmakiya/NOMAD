import { useState } from "react";
import { settingsCopy } from "../../../content/settingsCopy.js";

export default function VerifyBvnPage() {
  const [bvn, setBvn] = useState("");
  const isComplete = bvn.length === 11;

  const handleChange = (event) => {
    setBvn(event.target.value.replace(/\D/g, "").slice(0, 11));
  };

  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.identity.bvnRequired}</p>
        <p className="hint">{settingsCopy.identity.bvnDescription}</p>
        <div className="authForm">
          <label>Bank Verification Number (BVN)</label>
          <input className="input" inputMode="numeric" value={bvn} onChange={handleChange} />
          <p className={`bvnCounter ${isComplete ? "bvnCounterOk" : ""}`}>
            {bvn.length} / 11
          </p>
          <button className="primary" type="button" disabled={!isComplete}>
            Verify BVN
          </button>
        </div>
      </div>
    </div>
  );
}
