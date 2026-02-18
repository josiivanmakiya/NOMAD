import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";

export default function ProfilePage() {
  const { user } = useAuth();
  const [legacyInstruction, setLegacyInstruction] = useState({
    action: "hold_and_wait",
    contactName: "",
    contactPhone: "",
    notes: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nomadLegacyInstruction");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setLegacyInstruction((prev) => ({ ...prev, ...parsed }));
    } catch {
      // Ignore malformed local data.
    }
  }, []);

  const saveLegacyInstruction = () => {
    try {
      localStorage.setItem("nomadLegacyInstruction", JSON.stringify(legacyInstruction));
      setStatus("Instruction saved.");
    } catch {
      setStatus("Could not save locally.");
    }
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Profile</h2>
          <p className="hint">Verified identity and continuity controls for long-horizon account governance.</p>
        </div>
        <div className="actions">
          <button className="ghost" type="button">
            Edit profile
          </button>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="modeGroup">
          <p className="modeGroupTitle">Read-Only</p>
          <div className="card readOnlySurface">
            <p className="label">Identity</p>
            <div className="profileFields">
              <div>
                <p className="profileLabel">Full name</p>
                <p className="profileValue">Verified Name</p>
              </div>
              <div>
                <p className="profileLabel">Email</p>
                <p className="profileValue">email@example.com</p>
              </div>
              <div>
                <p className="profileLabel">Phone number</p>
                <p className="profileValue">+234 000 000 0000</p>
              </div>
              <div>
                <p className="profileLabel">Identity status</p>
                <p className="profileValue">Verified</p>
              </div>
              <div>
                <p className="profileLabel">Account type</p>
                <p className="profileValue">
                  {String(user?.userType || "individual").toUpperCase()}
                </p>
              </div>
            </div>
            <p className="hint">Identity mutations require support-side legal verification.</p>
          </div>

          <div className="card readOnlySurface">
            <p className="label">Preferences</p>
            <div className="profileFields">
              <div>
                <p className="profileLabel">Primary currency</p>
                <p className="profileValue">NGN</p>
              </div>
              <div>
                <p className="profileLabel">Display FX mode</p>
                <p className="profileValue">Live conversion (read-only display)</p>
              </div>
              <div>
                <p className="profileLabel">Primary payout account</p>
                <p className="profileValue">First Bank •••• 1234</p>
              </div>
              <div>
                <p className="profileLabel">Security</p>
                <p className="profileValue">PIN set · 2FA off · Biometrics off</p>
              </div>
              <div>
                <p className="profileLabel">Support contact</p>
                <p className="profileValue">support@nomad.money</p>
              </div>
            </div>
          </div>

          <div className="card actionSurface">
            <details>
              <summary className="label" style={{ cursor: "pointer" }}>
                Account continuity instruction
              </summary>
              <p className="hint mt-3">
                Define post-incident instructions activated only after verified legal documentation.
              </p>
              <div className="authForm">
                <label>Preferred action</label>
                <select
                  className="input"
                  value={legacyInstruction.action}
                  onChange={(event) =>
                    setLegacyInstruction((prev) => ({ ...prev, action: event.target.value }))
                  }
                >
                  <option value="hold_and_wait">Hold funds until legal verification</option>
                  <option value="release_to_verified_next_of_kin">
                    Release to verified next of kin
                  </option>
                  <option value="transfer_to_estate_account">
                    Transfer to estate account
                  </option>
                </select>
                <label>Trusted contact name</label>
                <input
                  className="input"
                  value={legacyInstruction.contactName}
                  onChange={(event) =>
                    setLegacyInstruction((prev) => ({ ...prev, contactName: event.target.value }))
                  }
                  placeholder="Full legal name"
                />
                <label>Trusted contact phone</label>
                <input
                  className="input"
                  value={legacyInstruction.contactPhone}
                  onChange={(event) =>
                    setLegacyInstruction((prev) => ({ ...prev, contactPhone: event.target.value }))
                  }
                  placeholder="+234..."
                />
                <label>Instruction notes</label>
                <textarea
                  className="input"
                  rows={3}
                  value={legacyInstruction.notes}
                  onChange={(event) =>
                    setLegacyInstruction((prev) => ({ ...prev, notes: event.target.value }))
                  }
                  placeholder="Legal or operational instruction"
                />
                <button className="primary" type="button" onClick={saveLegacyInstruction}>
                  Save continuity instruction
                </button>
                {status ? <p className="status">{status}</p> : null}
              </div>
            </details>
          </div>
        </div>

        <div className="modeGroup">
          <p className="modeGroupTitle">Actions</p>
          <div className="card actionSurface">
            <p className="label">Edit details</p>
            <div className="authForm">
              <label>Display name</label>
              <input className="input" placeholder="Optional" />
              <label>Preferred email</label>
              <input className="input" placeholder="Optional" />
              <label>Preferred phone</label>
              <input className="input" placeholder="Optional" />
              <label>Bio</label>
              <textarea className="input" rows={4} placeholder="Optional" />
              <label>Primary currency</label>
              <select className="input" defaultValue="NGN">
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
              <label className="labelRow">
                <span>Enable 2FA for Early Unlock</span>
                <input type="checkbox" />
              </label>
              <button className="primary" type="button">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Profile page with read-only identity plus editable preferences.
 *
 * USED BY:
 * - src/App.jsx (/app/profile)
 */
