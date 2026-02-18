import { Link } from "react-router-dom";
import { RULES_TEXT } from "../content/rulesText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";

export default function RulesPage() {
  return (
    <div className="page rulesPage">
      <div className="pageHeader">
        <div>
          <p className="label valuesHeading">{RULES_TEXT.page.eyebrow}</p>
          <h2 className="textTitle valuesHeading">
            <span className="nomadWord">NOMAD</span> {RULES_TEXT.page.title}
          </h2>
          <p className="pageSubtitle">{RULES_TEXT.page.subtitle}</p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.basics.title}</p>
        <ol className="list">
          {RULES_TEXT.basics.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.tiers.title}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {RULES_TEXT.tiers.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {RULES_TEXT.tiers.rows.map((row) => (
            <div key={row.amount} className="valuesTableRow">
              <p>{row.amount}</p>
              <p>{row.duration}</p>
            </div>
          ))}
        </div>
        <p className="hint">{RULES_TEXT.tiers.note}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.relock.title}</p>
        <ol className="list">
          {RULES_TEXT.relock.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.unlock.title}</p>
        <ol className="list">
          {RULES_TEXT.unlock.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.custom.title}</p>
        <ol className="list">
          {RULES_TEXT.custom.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.rewards.title}</p>
        <p className="hint">{RULES_TEXT.rewards.intro}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {RULES_TEXT.rewards.pointsHeaders.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {RULES_TEXT.rewards.pointsRows.map((row) => (
            <div key={row.action} className="valuesTableRow">
              <p>{row.action}</p>
              <p>{row.points}</p>
              <p>{row.rule}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Discipline Levels</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {RULES_TEXT.rewards.levelHeaders.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {RULES_TEXT.rewards.levelRows.map((row) => (
            <div key={row.level} className="valuesTableRow">
              <p>{row.level}</p>
              <p>{row.points}</p>
              <p>{row.benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.dashboard.title}</p>
        <ol className="list">
          {RULES_TEXT.dashboard.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.definitions.title}</p>
        <ol className="list">
          {RULES_TEXT.definitions.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <p className="label valuesHeading">{RULES_TEXT.taxChecklist.title}</p>
        <ol className="list">
          {RULES_TEXT.taxChecklist.items.map((line) => (
            <li key={line} className="hint">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="actions">
        <Link className="primary" to="/signup">
          {RULES_TEXT.cta.primary}
        </Link>
        <Link className="ghost" to="/">
          {RULES_TEXT.cta.secondary}
        </Link>
      </div>

      <PublicFooterNav />
    </div>
  );
}

/**
 * FILE ROLE:
 * Public rules page with full protocol structure and lock tiers.
 *
 * USED BY:
 * - src/App.jsx (/rules)
 */
