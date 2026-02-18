import { useEffect, useState } from "react";
import {
  cancelRecurringProtocol,
  createRecurringProtocol,
  getRecurringRecommendation,
  listRecurringProtocols,
  pauseRecurringProtocol,
  resumeRecurringProtocol,
} from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

const toDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

export default function RecurringProtocolsPage() {
  const { user } = useAuth();
  const [protocols, setProtocols] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "4000",
    frequency: "daily",
    authCode: "AUTH_DEV_TOKEN",
    userEmail: "",
    isAutoRelockEnabled: true,
  });
  const isTierOneOrHigher = Number(user?.tier || 0) >= 1;
  const isBusinessUser = String(user?.userType || "individual") === "business";

  if (!isTierOneOrHigher) {
    return (
      <div className="page">
        <div className="card">
          <p className="label">Tier 1 Required</p>
          <p className="hint">
            Recurring deductions are enabled only after BVN/NIN verification.
          </p>
          <div className="actions">
            <Link className="primaryLink" to="/verify/identity">
              Complete Tier 1
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const loadData = async () => {
    const [listRes, recRes] = await Promise.all([
      listRecurringProtocols(),
      getRecurringRecommendation(),
    ]);
    setProtocols(listRes.protocols || []);
    setRecommendation(recRes.recommendation || null);
  };

  useEffect(() => {
    loadData().catch((error) => setStatus(error.message));
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await createRecurringProtocol({
        authCode: form.authCode.trim(),
        userEmail: form.userEmail.trim(),
        amount: Number(form.amount),
        frequency: form.frequency,
        isAutoRelockEnabled: form.isAutoRelockEnabled,
      });
      setStatus("Recurring protocol created.");
      await loadData();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (action, protocolId) => {
    setStatus("");
    setLoading(true);
    try {
      await action(protocolId);
      await loadData();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Recurring Deposits</h2>
          <p className="pageSubtitle">
            Automate safe deductions from your verified account by amount and frequency.
          </p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          <div className="card">
            <p className="label">Set protocol</p>
            <p className="hint">
              Nomad charges your authorized token on schedule, then applies lock rules server-side.
            </p>
            <p className="hint">
              Nomad Insight: automation reduces daily willpower burden by moving funds before impulse windows.
            </p>
            <form className="authForm" onSubmit={handleCreate}>
              <label>Amount (NGN)</label>
              <input
                className="input"
                type="number"
                min="1000"
                value={form.amount}
                onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              />
              <label>Frequency</label>
              <select
                className="input"
                value={form.frequency}
                onChange={(event) => setForm((prev) => ({ ...prev, frequency: event.target.value }))}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <label>Authorization token</label>
              <input
                className="input"
                value={form.authCode}
                onChange={(event) => setForm((prev) => ({ ...prev, authCode: event.target.value }))}
                placeholder="AUTH_xxx"
              />
              <label>Account email</label>
              <input
                className="input"
                value={form.userEmail}
                onChange={(event) => setForm((prev) => ({ ...prev, userEmail: event.target.value }))}
                placeholder="you@example.com"
              />
              <label className="actions">
                <input
                  type="checkbox"
                  checked={form.isAutoRelockEnabled}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, isAutoRelockEnabled: event.target.checked }))
                  }
                />
                <span className="hint">Enable Auto-Relock Sentinel</span>
              </label>
              <button className="primary" type="submit" disabled={loading}>
                Save recurring protocol
              </button>
            </form>
            {status ? <p className="status">{status}</p> : null}
          </div>

          {isBusinessUser ? (
            <div className="card">
              <p className="label valuesHeading">Profit Firewall (Business)</p>
              <p className="hint">
                Auto-lock projected profits on a fixed schedule so business operating cash and preserved profit stay separated.
              </p>
              <p className="hint">
                Example protocol: extract 15% of new inflows every Friday and lock for 90 days.
              </p>
            </div>
          ) : (
            <div className="card">
              <p className="label">Account Type</p>
              <p className="hint">
                Current profile is Individual. Business Profit Firewall appears only for Business accounts.
              </p>
            </div>
          )}
        </div>

        <div className="dashboardStack">
          <div className="card">
            <p className="label">Cost recommendation</p>
            <p className="hint">
              Cheapest estimated fee:{" "}
              {recommendation?.recommended?.frequency
                ? recommendation.recommended.frequency.toUpperCase()
                : "—"}
            </p>
          </div>

          <div className="card">
            <p className="label">Active protocols</p>
            <div className="list">
              {protocols.length === 0 ? (
                <p className="hint">No recurring protocol yet.</p>
              ) : (
                protocols.map((protocol) => (
                  <div key={protocol._id} className="listItem listItemTight">
                    <div className="kv">
                      <p className="label">Amount</p>
                      <p className="amount">₦{Number(protocol.amount || 0).toLocaleString()}</p>
                    </div>
                    <div className="kv">
                      <p className="label">Frequency</p>
                      <p>{String(protocol.frequency || "").toUpperCase()}</p>
                    </div>
                    <div className="kv">
                      <p className="label">Next charge</p>
                      <p>{toDateTime(protocol.nextChargeDate)}</p>
                    </div>
                    <div className="kv">
                      <p className="label">Auto-Relock</p>
                      <p>{protocol.isAutoRelockEnabled ? "ON" : "OFF"}</p>
                    </div>
                    <div className="kv">
                      <p className="label">Failures</p>
                      <p>{Number(protocol.failedAttemptsCount || 0)}</p>
                    </div>
                    <div className="actions">
                      {protocol.status === "active" ? (
                        <button
                          className="ghost"
                          type="button"
                          onClick={() => runAction(pauseRecurringProtocol, protocol._id)}
                          disabled={loading}
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          className="ghost"
                          type="button"
                          onClick={() => runAction(resumeRecurringProtocol, protocol._id)}
                          disabled={loading}
                        >
                          Resume
                        </button>
                      )}
                      <button
                        className="ghost"
                        type="button"
                        onClick={() => runAction(cancelRecurringProtocol, protocol._id)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
