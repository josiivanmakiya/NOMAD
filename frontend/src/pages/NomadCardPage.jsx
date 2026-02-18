import { NOMAD_CARD_TEXT } from "../content/nomadCardText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";

export default function NomadCardPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{NOMAD_CARD_TEXT.page.title}</h2>
          <p className="pageSubtitle">{NOMAD_CARD_TEXT.page.subtitle}</p>
        </div>
        <div className="actions">
          <span className="protocolTag">{NOMAD_CARD_TEXT.page.status}</span>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{NOMAD_CARD_TEXT.silentLeak.heading}</p>
        {NOMAD_CARD_TEXT.silentLeak.body.map((line) => (
          <p key={line} className="hint">
            {line}
          </p>
        ))}
      </div>

      <div className="card">
        <p className="label valuesHeading">{NOMAD_CARD_TEXT.aggregation.heading}</p>
        {NOMAD_CARD_TEXT.aggregation.body.map((line) => (
          <p key={line} className="hint">
            {line}
          </p>
        ))}
      </div>

      <div className="card">
        <div className="sectionHeaderRow">
          <p className="label valuesHeading">{NOMAD_CARD_TEXT.guillotine.heading}</p>
          <span className="protocolTag">In Development</span>
        </div>
        {NOMAD_CARD_TEXT.guillotine.body.map((line) => (
          <p key={line} className="hint">
            {line}
          </p>
        ))}
        <div className="valuesTable">
          <div className="valuesTableHeader nomadCardTableHeader">
            {NOMAD_CARD_TEXT.guillotine.tableHeaders.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {NOMAD_CARD_TEXT.guillotine.tableRows.map((row) => (
            <div key={row.label} className="valuesTableRow nomadCardTableRow">
              <p>{row.label}</p>
              <p>{row.monthly}</p>
              <p>{row.leak10y}</p>
              <p>{row.locked10y}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Nomad Card Preview</p>
        <div className="nomadCardImageWrap" aria-label="Nomad Card concept image">
          <svg
            className="nomadCardImage"
            viewBox="0 0 960 600"
            role="img"
            aria-labelledby="nomadCardTitle"
          >
            <title id="nomadCardTitle">Nomad Card concept</title>
            <defs>
              <linearGradient id="nomadCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              <linearGradient id="nomadCardScan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#163624" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#1f7a3f" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#163624" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="960" height="600" fill="#ffffff" />
            <rect x="80" y="90" rx="8" ry="8" width="800" height="420" fill="url(#nomadCardBg)" />
            <rect x="80" y="90" rx="8" ry="8" width="800" height="420" fill="url(#nomadCardScan)" />
            <rect x="112" y="124" width="736" height="352" fill="none" stroke="#3f3f46" strokeWidth="2" />
            <line x1="120" y1="210" x2="840" y2="210" stroke="#2b2b30" strokeWidth="2" />
            <line x1="120" y1="260" x2="840" y2="260" stroke="#2b2b30" strokeWidth="2" />
            <line x1="120" y1="360" x2="840" y2="360" stroke="#2b2b30" strokeWidth="2" />
            <text x="130" y="178" fill="#1f7a3f" fontSize="36" fontFamily="JetBrains Mono, monospace" letterSpacing="8">
              NOMAD
            </text>
            <text x="130" y="326" fill="#a1a1aa" fontSize="18" fontFamily="JetBrains Mono, monospace" letterSpacing="4">
              DISCIPLINE ACCESS TOKEN
            </text>
            <text x="130" y="398" fill="#71717a" fontSize="14" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
              CLOSED LOOP / AUTHORIZED ONLY
            </text>
            <rect x="690" y="128" width="150" height="80" fill="none" stroke="#1f7a3f" strokeWidth="2" />
            <text x="705" y="176" fill="#1f7a3f" fontSize="18" fontFamily="JetBrains Mono, monospace">
              SG-203
            </text>
            <rect x="690" y="378" width="150" height="80" fill="none" stroke="#52525b" strokeWidth="2" />
            <text x="708" y="425" fill="#a1a1aa" fontSize="14" fontFamily="JetBrains Mono, monospace">
              ACTIVE
            </text>
          </svg>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{NOMAD_CARD_TEXT.globalControl.heading}</p>
        <div className="list">
          {NOMAD_CARD_TEXT.globalControl.items.map((item) => (
            <p key={item} className="hint">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Closing Statement</p>
        <p className="hint">{NOMAD_CARD_TEXT.closing}</p>
      </div>

      <PublicFooterNav />
    </div>
  );
}
