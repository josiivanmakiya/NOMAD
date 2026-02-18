import { KNOWLEDGE_TEXT } from "../content/knowledgeText.js";
import DataCard from "../components/DataCard.jsx";
import PublicFooterNav from "../components/PublicFooterNav.jsx";

export default function KnowledgePage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{KNOWLEDGE_TEXT.page.title}</h2>
          <p className="pageSubtitle">{KNOWLEDGE_TEXT.page.subtitle}</p>
        </div>
        <div className="actions">
          <span className="protocolTag">Intelligence</span>
        </div>
      </div>

      <div className="card knowledgeTimeline">
        {KNOWLEDGE_TEXT.sections.map((section) => (
          <div key={section.id} className="knowledgeNode">
            <p className="label valuesHeading">{section.heading}</p>
            {section.body.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="card">
        <p className="label valuesHeading">{KNOWLEDGE_TEXT.projection.heading}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            {KNOWLEDGE_TEXT.projection.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {KNOWLEDGE_TEXT.projection.rows.map((row) => (
            <div key={row.leak} className="valuesTableRow">
              <p>{row.leak}</p>
              <p>{row.y1}</p>
              <p>{row.y10}</p>
              <p>{row.y20}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{KNOWLEDGE_TEXT.dictionary.heading}</p>
        <div className="gridCards">
          {KNOWLEDGE_TEXT.dictionary.items.map((item) => (
            <DataCard
              key={item.term}
              term={item.term}
              mechanism={item.mechanism}
              detail={item.detail}
            />
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{KNOWLEDGE_TEXT.oracle.heading}</p>
        <p className="hint">
          <span className="knowledgeRole">USER:</span> {KNOWLEDGE_TEXT.oracle.user}
        </p>
        <p className="hint">
          <span className="knowledgeRole">ORACLE:</span> {KNOWLEDGE_TEXT.oracle.ai}
        </p>
      </div>

      <div className="card">
        <p className="hint">{KNOWLEDGE_TEXT.closing}</p>
      </div>

      <PublicFooterNav />
    </div>
  );
}
