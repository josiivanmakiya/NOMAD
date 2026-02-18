import { TAX_EFFICIENCY_TEXT } from "../content/taxEfficiencyText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";

export default function TaxEfficiencyPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{TAX_EFFICIENCY_TEXT.page.title}</h2>
          <p className="pageSubtitle">{TAX_EFFICIENCY_TEXT.page.subtitle}</p>
        </div>
        <div className="actions">
          <span className="protocolTag">{TAX_EFFICIENCY_TEXT.page.status}</span>
        </div>
      </div>

      <div className="card">
        <p className="hint">{TAX_EFFICIENCY_TEXT.intro}</p>
      </div>

      <div className="card">
        <div className="sectionHeaderRow">
          <p className="label valuesHeading">{TAX_EFFICIENCY_TEXT.nigeriaFocus.heading}</p>
          <span className="protocolTag">{TAX_EFFICIENCY_TEXT.nigeriaFocus.tag}</span>
        </div>
        <p className="hint">{TAX_EFFICIENCY_TEXT.nigeriaFocus.intro}</p>
        <div className="list">
          {TAX_EFFICIENCY_TEXT.nigeriaFocus.blocks.map((block) => (
            <div key={block.title} className="cardMuted">
              <p className="label">{block.title}</p>
              {block.lines.map((line) => (
                <p key={line} className="hint">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboardStack">
        {TAX_EFFICIENCY_TEXT.pillars.map((pillar) => (
          <div key={pillar.heading} className="card">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{pillar.heading}</p>
              {pillar.tag ? <span className="protocolTag">{pillar.tag}</span> : null}
            </div>
            {pillar.body.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="card">
        <p className="label valuesHeading">{TAX_EFFICIENCY_TEXT.checklist.heading}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader dynastySummaryHeader">
            {TAX_EFFICIENCY_TEXT.checklist.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {TAX_EFFICIENCY_TEXT.checklist.rows.map((row) => (
            <div key={row.step} className="valuesTableRow dynastySummaryRow">
              <p>{row.step}</p>
              <p>{row.action}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">The Nigerian Protocol</p>
        <div className="list">
          {TAX_EFFICIENCY_TEXT.nigeriaFocus.checklist.map((item) => (
            <p key={item} className="hint">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{TAX_EFFICIENCY_TEXT.nigeriaFocus.userStory.title}</p>
        <p className="hint">{TAX_EFFICIENCY_TEXT.nigeriaFocus.userStory.body}</p>
      </div>

      <div className="card">
        <p className="label valuesHeading">Compliance Note</p>
        <p className="hint">{TAX_EFFICIENCY_TEXT.disclaimer}</p>
      </div>

      <PublicFooterNav />
    </div>
  );
}
