import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_FLOW_COPY } from "../content/authFlowCopy.js";
import { verifyIdentity } from "../api.js";
import { useAuth } from "../state/AuthContext.jsx";

export default function VerifyIdentityPage() {
  const { verification } = AUTH_FLOW_COPY;
  const [bvn, setBvn] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const next = event.target.value.replace(/\D/g, "").slice(0, 11);
    setBvn(next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (bvn.length !== 11) return;
    setLoading(true);
    setStatus("");
    try {
      const verifiedName = user?.name || user?.email || "Nomad User";
      await verifyIdentity({ provider: "bvn", verifiedName });
      navigate("/connect-bank");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = bvn.length === 11;

  return (
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">{verification.title}</h2>
        <p className="hint">{verification.body}</p>
        <form onSubmit={handleSubmit} className="authForm">
          <label>{verification.fieldLabel}</label>
          <input
            className="input"
            inputMode="numeric"
            value={bvn}
            onChange={handleChange}
          />
          <p className={`bvnCounter ${canSubmit ? "bvnCounterOk" : ""}`}>
            {bvn.length} / 11
          </p>
          <p className="hint">{verification.helper}</p>
          {status ? <p className="status">{status}</p> : null}
          <button className="primary" type="submit" disabled={!canSubmit || loading}>
            {verification.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Mandatory identity verification (BVN).
 *
 * CONNECTS TO:
 * - content/authFlowCopy.js
 *
 * USED BY:
 * - src/App.jsx (/verify/identity)
 */
