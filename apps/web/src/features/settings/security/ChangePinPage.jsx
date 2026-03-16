import { useState } from "react";
import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function ChangePinPage() {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");

  const handlePin = (event) => {
    setPin(event.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleConfirm = (event) => {
    setConfirm(event.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const canSubmit = pin.length === 6 && confirm.length === 6 && pin === confirm;

  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.security.changePin.title}</p>
        <p className="hint">{settingsCopy.security.changePin.description}</p>
        <div className="authForm">
          <label>New PIN</label>
          <input className="input" type="password" value={pin} onChange={handlePin} />
          <label>Confirm PIN</label>
          <input
            className="input"
            type="password"
            value={confirm}
            onChange={handleConfirm}
          />
          <button className="primary" type="button" disabled={!canSubmit}>
            Save PIN
          </button>
        </div>
      </div>
    </div>
  );
}

