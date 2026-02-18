import { Link } from "react-router-dom";
import { PROTOCOL_TEXT } from "../content/protocolText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";
import protocolImage1 from "../../images/Screenshot 2026-02-17 222538.png";
import protocolImage2 from "../../images/Screenshot 2026-02-17 222715.png";
import protocolImage3 from "../../images/Screenshot 2026-02-17 222801.png";
import protocolImage4 from "../../images/Screenshot 2026-02-17 222425.png";
import protocolImage5 from "../../images/Screenshot 2026-02-17 222218.png";
import protocolImage6 from "../../images/Screenshot 2026-02-17 222146.png";
import protocolImage7 from "../../images/Screenshot 2026-02-17 222045.png";
import protocolImage8 from "../../images/Screenshot 2026-02-17 221911.png";
import protocolImage9 from "../../images/Screenshot 2026-02-15 230143.png";
import protocolHeaderImage from "../../images/Screenshot 2026-02-17 222425.png";
import protocolFooterImage from "../../images/Screenshot 2026-02-17 222538.png";
import protocolImage10 from "../../images/Screenshot 2026-02-17 223749.png";

export default function ProtocolPage() {
  const sectionImageMap = {
    "banking-rails": "/images/museum-1.svg",
    "cognitive-firewall": "/images/nomad-hero-upload.png",
    "liquidity-crisis": "/images/museum-2.svg",
    "phase-two": protocolImage8,
    "nomad-insight": protocolImage9,
    institutional: protocolImage7,
  };

  return (
    <div className="page protocolPage">
      <div className="protocolPaper">
        <div className="pageHeader">
          <div>
            <h2 className="textTitle valuesHeading">{PROTOCOL_TEXT.page.title}</h2>
            <p className="pageSubtitle">{PROTOCOL_TEXT.page.subtitle}</p>
          </div>
          <div className="actions">
            <Link className="ghostLink" to="/app/values">
              Economics
            </Link>
          </div>
        </div>

        <div className="pageHeaderImageWrap">
          <img src={protocolHeaderImage} alt="Protocol header visual" className="pageHeaderImage" />
        </div>

        <div className="dashboardStack">
          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{PROTOCOL_TEXT.antiBank.heading}</p>
              <span className="protocolTag">Positioning</span>
            </div>
            <p className="hint">{PROTOCOL_TEXT.antiBank.statement}</p>
            {PROTOCOL_TEXT.antiBank.body.map((line) => (
              <p key={line} className="hint">
                {line}
              </p>
            ))}
            <div className="valuesTable">
              <div className="valuesTableHeader antiBankTableHeader">
                {PROTOCOL_TEXT.antiBank.table.headers.map((header, index) => (
                  <p
                    key={header}
                    className={index === 2 ? "nomadProtocolHeaderCell" : ""}
                  >
                    {header}
                  </p>
                ))}
              </div>
              {PROTOCOL_TEXT.antiBank.table.rows.map((row) => (
                <div key={row.feature} className="valuesTableRow antiBankTableRow">
                  <p>{row.feature}</p>
                  <p>{row.bank}</p>
                  <p className="nomadProtocolDataCell">{row.nomad}</p>
                </div>
              ))}
            </div>
            <div className="list">
              {PROTOCOL_TEXT.antiBank.security.map((line) => (
                <p key={line} className="hint">
                  {line}
                </p>
              ))}
            </div>
            <p className="hint valuesHeading">{PROTOCOL_TEXT.antiBank.line}</p>
          </div>

          <div className="protocolImageStack">
            <section className="protocolImageBand protocolImageBandArchitecture">
              <img className="protocolBandImage" src={protocolImage1} alt="Protocol architecture visual" />
              <div className="protocolImageOverlay protocolOverlayTopLeft">
                <h4 className="protocolImageLabel">Protocol Architecture</h4>
                <p className="protocolImageText">Core system view for lock logic, rails, and release path.</p>
              </div>
            </section>
            <section className="protocolImageBand protocolImageBandFlow">
              <img className="protocolBandImage" src={protocolImage2} alt="Protocol flow visual" />
              <div className="protocolImageOverlay protocolOverlayCenterLeft">
                <h4 className="protocolImageLabel">Flow Sequence</h4>
                <p className="protocolImageText">Lifecycle from deposit to maturity and controlled release.</p>
              </div>
            </section>
            <section className="protocolImageBand protocolImageBandMetrics">
              <img className="protocolBandImage" src={protocolImage3} alt="Protocol metrics visual" />
              <div className="protocolImageOverlay protocolOverlayBottomRight">
                <h4 className="protocolImageLabel">Performance Signals</h4>
                <p className="protocolImageText">Visual evidence layer for retention and discipline metrics.</p>
              </div>
            </section>
            <section className="protocolImageBand protocolImageBandSecurity">
              <img className="protocolBandImage" src={protocolImage4} alt="Protocol security rails visual" />
              <div className="protocolImageOverlay protocolOverlayTopLeft">
                <h4 className="protocolImageLabel">Security Rails</h4>
                <p className="protocolImageText">Verified-account return paths and closed-loop protection.</p>
              </div>
            </section>
            <section className="protocolImageBand protocolImageBandLegacy">
              <img className="protocolBandImage" src={protocolImage5} alt="Protocol legacy continuity visual" />
              <div className="protocolImageOverlay protocolOverlayBottomRight">
                <h4 className="protocolImageLabel">Legacy Continuity</h4>
                <p className="protocolImageText">Long-horizon structure for transition and wealth continuity.</p>
              </div>
            </section>
          </div>

          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">The $16 Trillion RWA Frontier</p>
              <span className="protocolTag">In Development</span>
            </div>
            <p className="hint">{PROTOCOL_TEXT.rwaCounter.label}</p>
            <p className="protocolCounter">{PROTOCOL_TEXT.rwaCounter.value}</p>
            <p className="hint">{PROTOCOL_TEXT.rwaCounter.caption}</p>
          </div>

          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{PROTOCOL_TEXT.blackrockSignal.label}</p>
              <span className="protocolTag">Signal</span>
            </div>
            <p className="hint protocolQuote">"{PROTOCOL_TEXT.blackrockSignal.quote}"</p>
            <p className="hint">{PROTOCOL_TEXT.blackrockSignal.source}</p>
            <p className="hint">{PROTOCOL_TEXT.blackrockSignal.note}</p>
          </div>

          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{PROTOCOL_TEXT.illiquidityTable.label}</p>
              <span className="protocolTag">In Development</span>
            </div>
            <div className="valuesTable">
              <div className="valuesTableHeader protocolTableHeader">
                {PROTOCOL_TEXT.illiquidityTable.headers.map((header) => (
                  <p key={header}>{header}</p>
                ))}
              </div>
              {PROTOCOL_TEXT.illiquidityTable.rows.map((row) => (
                <div key={row.type} className="valuesTableRow protocolTableRow">
                  <p>{row.type}</p>
                  <p>{row.roi}</p>
                  <p>{row.access}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{PROTOCOL_TEXT.loops.heading}</p>
              <span className="protocolTag">In Development</span>
            </div>
            <div className="protocolMediaRow">
              <div className="protocolMediaText">
                {PROTOCOL_TEXT.loops.body.map((line) => (
                  <p key={line} className="hint">
                    {line}
                  </p>
                ))}
                <div className="list">
                  {PROTOCOL_TEXT.loops.math.map((line) => (
                    <p key={line} className="hint">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="protocolMediaImage">
                <img src={protocolImage6} alt="Self-sustaining loops visual" />
              </div>
            </div>
          </div>

          <div className="card protocolChapter">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">{PROTOCOL_TEXT.analogy.heading}</p>
              <span className="protocolTag">Context</span>
            </div>
            <div className="protocolMediaRow">
              <div className="protocolMediaText">
                {PROTOCOL_TEXT.analogy.body.map((line) => (
                  <p key={line} className="hint">
                    {line}
                  </p>
                ))}
              </div>
              <div className="protocolMediaImage">
                <img src={protocolImage7} alt="Analogy context visual" />
              </div>
            </div>
          </div>

          {PROTOCOL_TEXT.sections.map((section) => (
            <div key={section.id} className="card protocolChapter">
              <div className="sectionHeaderRow">
                <p className="label valuesHeading">{section.heading}</p>
                {section.tag ? <span className="protocolTag">{section.tag}</span> : null}
              </div>
              <div className="protocolMediaRow">
                <div className="protocolMediaText">
                  {section.body.map((line) => (
                    <p key={line} className="hint">
                      {line}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <div className="list">
                      {section.bullets.map((item) => (
                        <p key={item} className="hint">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="protocolMediaImage">
                  <img
                    src={sectionImageMap[section.id] || protocolImage9}
                    alt={`${section.heading} visual`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card protocolChapter">
          <p className="label valuesHeading">Phase 2 Disclaimer</p>
          <p className="hint">{PROTOCOL_TEXT.disclaimer}</p>
          <p className="hint">
            Banking partner placeholder: {PROTOCOL_TEXT.partnerBank.name} ({PROTOCOL_TEXT.partnerBank.note})
          </p>
        </div>

        <div className="card protocolChapter">
          <div className="sectionHeaderRow">
            <p className="label valuesHeading">Multi-Currency Wealth</p>
            <span className="protocolTag">Operating Context</span>
          </div>
          <div className="protocolMediaRow">
            <div className="protocolMediaText">
              <p className="hint">
                Our founding team has lived in multiple countries, navigating the challenges of managing wealth across borders.
              </p>
              <p className="hint">
                Multi-currency is not an afterthought for us-it's a problem we've lived through and solved.
              </p>
            </div>
            <div className="protocolMediaImage">
              <img src={protocolImage10} alt="Multi-currency wealth visual" />
            </div>
          </div>
        </div>

        <div className="card protocolChapter">
          <p className="hint">{PROTOCOL_TEXT.closing}</p>
        </div>

        <div className="protocolFooterHero">
          <img src={protocolFooterImage} alt="Protocol footer visual" />
        </div>
      </div>

      <PublicFooterNav />
    </div>
  );
}
