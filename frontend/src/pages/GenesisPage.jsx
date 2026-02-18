import { useEffect, useState } from "react";
import {
  getGenesisBriefings,
  joinGenesisWaitlist,
} from "../api";
import { GENESIS_TEXT } from "../content/genesisText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";

export default function GenesisPage() {
  const [briefings, setBriefings] = useState([]);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    biggestLeak: "Betting",
    leakRange: "₦1,000 - ₦5,000",
    tenYearGoal: "Land",
    customTenYearGoal: "",
    automation: "high_protocol",
    resetConsent: true,
  });

  useEffect(() => {
    getGenesisBriefings()
      .then((briefingsRes) => {
        setBriefings(briefingsRes.briefings || []);
      })
      .catch(() => null);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setStatusTone("neutral");
    try {
      const normalizedTenYearGoal =
        form.tenYearGoal === "Other"
          ? form.customTenYearGoal.trim()
          : form.tenYearGoal;
      const response = await joinGenesisWaitlist({
        ...form,
        tenYearGoal: normalizedTenYearGoal,
      });
      setStatus(response.message || "Genesis waitlist joined.");
      setStatusTone("success");
    } catch (error) {
      setStatus(error.message);
      setStatusTone("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{GENESIS_TEXT.page.title}</h2>
          <p className="pageSubtitle">{GENESIS_TEXT.page.subtitle}</p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Genesis Enrollment</p>
        <form className="formGrid" onSubmit={submit}>
          <label className="field">
            <span className="profileLabel">{GENESIS_TEXT.labels.email}</span>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span className="profileLabel">{GENESIS_TEXT.labels.phoneNumber}</span>
            <input
              className="input"
              value={form.phoneNumber}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, phoneNumber: event.target.value }))
              }
              placeholder="+234..."
              required
            />
          </label>

          <label className="field">
            <span className="profileLabel">{GENESIS_TEXT.labels.biggestLeak}</span>
            <select
              className="input"
              value={form.biggestLeak}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, biggestLeak: event.target.value }))
              }
            >
              <option value="Betting">Betting</option>
              <option value="Snacks">Snacks</option>
              <option value="Impulsive Transfer">Impulsive Transfer</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="field">
            <span className="profileLabel">Leak Range</span>
            <select
              className="input"
              value={form.leakRange}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, leakRange: event.target.value }))
              }
            >
              <option value="₦1,000 - ₦5,000">₦1,000 - ₦5,000</option>
              <option value="₦10,000 - ₦50,000">₦10,000 - ₦50,000</option>
              <option value="More than ₦50,000">More than ₦50,000</option>
            </select>
          </label>

          <label className="field">
            <span className="profileLabel">{GENESIS_TEXT.labels.tenYearGoal}</span>
            <select
              className="input"
              value={form.tenYearGoal}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, tenYearGoal: event.target.value }))
              }
            >
              <option value="Land">Land</option>
              <option value="Home Ownership">Home Ownership</option>
              <option value="Rental Property">Rental Property</option>
              <option value="Business">Business</option>
              <option value="Logistics Fleet">Logistics Fleet</option>
              <option value="Export Business">Export Business</option>
              <option value="Education Fund">Education Fund</option>
              <option value="Retirement Capital">Retirement Capital</option>
              <option value="Global Assets">Global Assets</option>
              <option value="Other">Other</option>
            </select>
          </label>
          {form.tenYearGoal === "Other" ? (
            <label className="field">
              <span className="profileLabel">Custom 10-Year Goal</span>
              <input
                className="input"
                value={form.customTenYearGoal}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, customTenYearGoal: event.target.value }))
                }
                placeholder="Type your long-term goal"
                required
              />
            </label>
          ) : null}

          <div className="field">
            <span className="profileLabel">{GENESIS_TEXT.labels.automation}</span>
            {GENESIS_TEXT.automationOptions.map((option) => (
              <label key={option.value} className="cardMuted">
                <div className="actions">
                  <input
                    type="radio"
                    name="automation"
                    value={option.value}
                    checked={form.automation === option.value}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, automation: event.target.value }))
                    }
                  />
                  <span className="label valuesHeading">{option.label}</span>
                </div>
                <p className="hint">{option.description}</p>
              </label>
            ))}
          </div>

          <label className="actions">
            <input
              type="checkbox"
              checked={form.resetConsent}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, resetConsent: event.target.checked }))
              }
            />
            <span className="hint">{GENESIS_TEXT.labels.resetConsent}</span>
          </label>

          <button className="primary" type="submit" disabled={loading}>
            {GENESIS_TEXT.cta.join}
          </button>
        </form>
        {status ? <p className={statusTone === "success" ? "status-green" : "status"}>{status}</p> : null}
      </div>

      <div className="card">
        <p className="label valuesHeading">Nomad Briefings</p>
        <div className="list">
          {briefings.map((briefing) => (
            <div key={briefing.day} className="dataCard">
              <p className="label valuesHeading">Day {briefing.day}</p>
              <p className="hint dataCardMechanism">{briefing.title}</p>
              <p className="hint">{briefing.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">The Economics of Discipline</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            <p>Level</p>
            <p>Daily Leak</p>
            <p>Annual</p>
            <p>20 Years</p>
            <p>Signal</p>
          </div>
          {GENESIS_TEXT.leakRows.map((row) => (
            <div key={row.level} className="valuesTableRow">
              <p>{row.level}</p>
              <p>{row.daily}</p>
              <p>{row.annual}</p>
              <p>{row.twentyYear}</p>
              <p>Preserve</p>
            </div>
          ))}
        </div>
      </div>

      <PublicFooterNav />
    </div>
  );
}
