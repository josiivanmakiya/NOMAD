import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_FLOW_COPY } from "../content/authFlowCopy.js";

export default function PinCreatePage() {
  const { pin } = AUTH_FLOW_COPY;
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const next = event.target.value.replace(/\D/g, "").slice(0, 6);
    setValue(next);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.length !== 6) return;
    navigate("/pin/confirm");
  };

  const canSubmit = value.length === 6;

  return (
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">{pin.create.title}</h2>
        <p className="hint">{pin.create.body}</p>
        <form onSubmit={handleSubmit} className="authForm">
          <label>PIN</label>
          <input
            className="input"
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={value}
            onChange={handleChange}
          />
          <button className="primary" type="submit" disabled={!canSubmit}>
            {pin.create.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Create a 6-digit vault PIN.
 *
 * CONNECTS TO:
 * - content/authFlowCopy.js
 *
 * USED BY:
 * - src/App.jsx (/pin/create)
 */
