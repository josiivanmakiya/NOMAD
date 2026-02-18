import { HISTORY_SPEC } from "../content/historySpec.js";

export default function HistorySpecPage() {
  const spec = HISTORY_SPEC;

  return (
    <div className="page">
      <h2 className="textTitle">{spec.title}</h2>
      <p className="hint">{spec.subtitle}</p>

      <div className="card">
        <p className="label">Principles</p>
        <div className="list">
          {spec.principles.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">Row anatomy</p>
        <div className="list">
          {spec.rowAnatomy.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">Icon map</p>
        <div className="list">
          {spec.iconMap.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">Row types</p>
        <div className="list">
          {spec.rowTypes.map((row) => (
            <div key={row.title}>
              <p className="settingsItemTitle">{row.title}</p>
              <p className="hint">{row.meta}</p>
              {row.amount ? <p className="amount">{row.amount}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">Event types</p>
        <div className="list">
          {spec.eventTypes.map((line) => (
            <p key={line} className="mono">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">Invariants</p>
        <div className="list">
          {spec.invariants.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label">AI rules</p>
        <div className="list">
          {spec.aiRules.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Read-only history spec page.
 */
