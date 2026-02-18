import { useMemo, useState } from "react";
import { VALUES_TEXT } from "../content/valuesText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";
import VatWhtCalculatorCard from "../components/VatWhtCalculatorCard.jsx";

export default function ValuesPage() {
  const [mode, setMode] = useState("NGN");

  const rows = useMemo(
    () => (mode === "NGN" ? VALUES_TEXT.table.ngnRows : VALUES_TEXT.table.usdRows),
    [mode]
  );
  const theoremText =
    mode === "NGN"
      ? VALUES_TEXT.theorem.ngn
      : VALUES_TEXT.theorem.usd;

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{VALUES_TEXT.page.title}</h2>
          <p className="pageSubtitle">{VALUES_TEXT.page.subtitle}</p>
        </div>
        <div className="actions">
          <button
            type="button"
            className={mode === "NGN" ? "primary" : "ghost"}
            onClick={() => setMode("NGN")}
          >
            NGN
          </button>
          <button
            type="button"
            className={mode === "USD" ? "primary" : "ghost"}
            onClick={() => setMode("USD")}
          >
            USD
          </button>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.intro.label}</p>
        <p className="hint">{VALUES_TEXT.intro.body}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">
          {mode === "NGN" ? VALUES_TEXT.sections.ngnTitle : VALUES_TEXT.sections.usdTitle}
        </p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {VALUES_TEXT.table.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row.level} className="valuesTableRow">
              <p>{row.level}</p>
              <p>{row.daily}</p>
              <p>{row.year1}</p>
              <p>{row.year10}</p>
              <p>{row.year20}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="card">
          <p className="label valuesHeading">{VALUES_TEXT.timeline.label}</p>
          <p className="hint">10 years: {rows[1].ownership10}</p>
          <p className="hint">20 years: {rows[1].ownership20}</p>
        </div>
        <div className="card">
          <p className="label valuesHeading">{VALUES_TEXT.theorem.label}</p>
          <p className="hint">{theoremText}</p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.taxLeak.label}</p>
        <p className="hint">{VALUES_TEXT.taxLeak.body}</p>
        <p className="hint">{VALUES_TEXT.taxLeak.exampleProblem}</p>
        <p className="hint">{VALUES_TEXT.taxLeak.exampleFix}</p>
        <p className="label valuesHeading">{VALUES_TEXT.taxLeak.checklistTitle}</p>
        <div className="list">
          {VALUES_TEXT.taxLeak.checklist.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <VatWhtCalculatorCard />
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.illiquidityExplainer.label}</p>
        <p className="hint">{VALUES_TEXT.illiquidityExplainer.intro}</p>
        <div className="list">
          {VALUES_TEXT.illiquidityExplainer.rows.map((row) => (
            <div key={row.title}>
              <p className="label">{row.title}</p>
              <p className="hint">{row.body}</p>
            </div>
          ))}
        </div>
        <p className="hint">{VALUES_TEXT.illiquidityExplainer.summary}</p>
        <p className="label valuesHeading">{VALUES_TEXT.illiquidityExplainer.analogyTitle}</p>
        <p className="hint">{VALUES_TEXT.illiquidityExplainer.analogy}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.maturity.label}</p>
        <p className="hint">{VALUES_TEXT.maturity.body}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.democratization.label}</p>
        <p className="hint">{VALUES_TEXT.democratization.body}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.localToGlobal.label}</p>
        <p className="hint">{VALUES_TEXT.localToGlobal.body}</p>
      </div>

      <div className="card">
        <div className="sectionHeaderRow">
          <p className="label valuesHeading">{VALUES_TEXT.africanRwa.label}</p>
          <span className="protocolTag">{VALUES_TEXT.africanRwa.tag}</span>
        </div>
        <div className="list">
          {VALUES_TEXT.africanRwa.items.map((item) => (
            <p key={item} className="hint">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sectionHeaderRow">
          <p className="label valuesHeading">{VALUES_TEXT.rwaHub.label}</p>
          <span className="protocolTag">{VALUES_TEXT.rwaHub.tag}</span>
        </div>
        <p className="hint">{VALUES_TEXT.rwaHub.intro}</p>
        <div className="list">
          {VALUES_TEXT.rwaHub.thesis.map((line) => (
            <p key={line} className="hint">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.rwaHub.tracksTitle}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {VALUES_TEXT.rwaHub.tracksHeaders.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {VALUES_TEXT.rwaHub.tracksRows.map((row) => (
            <div key={row.track} className="valuesTableRow">
              <p>{row.track}</p>
              <p>{row.focus}</p>
              <p>{row.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="card">
          <p className="label valuesHeading">{VALUES_TEXT.rwaHub.controlsTitle}</p>
          <div className="list">
            {VALUES_TEXT.rwaHub.controls.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="label valuesHeading">{VALUES_TEXT.rwaHub.flowTitle}</p>
          <div className="protocolFlow">
            {VALUES_TEXT.rwaHub.flow.map((step) => (
              <div key={step} className="protocolFlowStep">
                <p className="hint">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.rwaHub.readinessTitle}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {VALUES_TEXT.rwaHub.readinessHeaders.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {VALUES_TEXT.rwaHub.readinessRows.map((row) => (
            <div key={row.gate} className="valuesTableRow">
              <p>{row.gate}</p>
              <p>{row.signal}</p>
              <p>{row.impact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="card">
          <div className="sectionHeaderRow">
            <p className="label valuesHeading">{VALUES_TEXT.rwaLandscape.label}</p>
            <span className="protocolTag">{VALUES_TEXT.rwaLandscape.tag}</span>
          </div>
          <p className="hint">{VALUES_TEXT.rwaLandscape.intro}</p>
          <p className="label valuesHeading">{VALUES_TEXT.rwaLandscape.africaTitle}</p>
          <div className="list">
            {VALUES_TEXT.rwaLandscape.africaPoints.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="label valuesHeading">{VALUES_TEXT.rwaLandscape.nigeriaTitle}</p>
          <div className="list">
            {VALUES_TEXT.rwaLandscape.nigeriaPoints.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
          </div>
          <p className="hint">{VALUES_TEXT.rwaLandscape.note}</p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.noBarrier.label}</p>
        <p className="hint">{VALUES_TEXT.noBarrier.body}</p>
        <p className="hint valuesHeading">{VALUES_TEXT.noBarrier.line}</p>
      </div>

      <div className="card">
        <div className="sectionHeaderRow">
          <p className="label valuesHeading">{VALUES_TEXT.navigator.label}</p>
          <span className="protocolTag">{VALUES_TEXT.navigator.tag}</span>
        </div>
        <p className="hint">{VALUES_TEXT.navigator.body}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">{VALUES_TEXT.sovereigntyPath.label}</p>
        <div className="protocolFlow">
          {VALUES_TEXT.sovereigntyPath.steps.map((step) => (
            <div key={step} className="protocolFlowStep">
              <p className="hint">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <PublicFooterNav />
    </div>
  );
}
