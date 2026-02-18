import { Link } from "react-router-dom";
import { ROADMAP_TEXT } from "../content/roadmapText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";
import roadmapImage1 from "../../images/Screenshot 2026-02-17 222843.png";
import roadmapImage2 from "../../images/Screenshot 2026-02-17 222927.png";
import roadmapImage3 from "../../images/Screenshot 2026-02-17 223015.png";
import roadmapImage4 from "../../images/Screenshot 2026-02-17 223113.png";
import roadmapImage5 from "../../images/Screenshot 2026-02-17 223113.png";
import roadmapImage6 from "../../images/the problem.png";
import roadmapImage7 from "../../images/Screenshot 2026-02-17 223311.png";
import roadmapImage8 from "../../images/Screenshot 2026-02-17 223401.png";
import roadmapImage9 from "../../images/Screenshot 2026-02-17 222538.png";
import roadmapImage10 from "../../images/Screenshot 2026-02-17 223630.png";
import roadmapImage11 from "../../images/Screenshot 2026-02-17 223749.png";
import roadmapImage12 from "../../images/Screenshot 2026-02-17 223749.png";
import roadmapHeaderImage from "../../images/Screenshot 2026-02-17 222538.png";

export default function RoadmapPage() {
  return (
    <div className="page roadmapPage">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{ROADMAP_TEXT.page.title}</h2>
          <p className="pageSubtitle">{ROADMAP_TEXT.page.subtitle}</p>
        </div>
      </div>

      <div className="pageHeaderImageWrap">
        <img src={roadmapHeaderImage} alt="Roadmap header visual" className="pageHeaderImage" />
      </div>

      <div className="card knowledgeTimeline">
        {ROADMAP_TEXT.phases.map((phase) => (
          <div key={phase.id} className="knowledgeNode">
            <div className="sectionHeaderRow">
              <p className="label valuesHeading">
                {phase.phase}: {phase.title}
              </p>
              <span className="protocolTag">{phase.status}</span>
            </div>
            <p className="hint">
              <span className="label">Focus:</span> {phase.focus}
            </p>
            <p className="hint">
              <span className="label">Mechanism:</span> {phase.mechanism}
            </p>
            <p className="hint">
              <span className="label">Outcome:</span> {phase.outcome}
            </p>
          </div>
        ))}
      </div>

      <div className="roadmapMediaStack">
        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.phases[0].phase}: {ROADMAP_TEXT.phases[0].title}</h4>
            <p className="hint"><span className="label">Focus:</span> {ROADMAP_TEXT.phases[0].focus}</p>
            <p className="hint"><span className="label">Mechanism:</span> {ROADMAP_TEXT.phases[0].mechanism}</p>
            <p className="hint"><span className="label">Outcome:</span> {ROADMAP_TEXT.phases[0].outcome}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage1} alt="Phase 1 visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.phases[1].phase}: {ROADMAP_TEXT.phases[1].title}</h4>
            <p className="hint"><span className="label">Focus:</span> {ROADMAP_TEXT.phases[1].focus}</p>
            <p className="hint"><span className="label">Mechanism:</span> {ROADMAP_TEXT.phases[1].mechanism}</p>
            <p className="hint"><span className="label">Outcome:</span> {ROADMAP_TEXT.phases[1].outcome}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage2} alt="Phase 2 visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.phases[2].phase}: {ROADMAP_TEXT.phases[2].title}</h4>
            <p className="hint"><span className="label">Focus:</span> {ROADMAP_TEXT.phases[2].focus}</p>
            <p className="hint"><span className="label">Mechanism:</span> {ROADMAP_TEXT.phases[2].mechanism}</p>
            <p className="hint"><span className="label">Outcome:</span> {ROADMAP_TEXT.phases[2].outcome}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage3} alt="Phase 3 visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.institutionalBridge.heading}</h4>
            <p className="hint">{ROADMAP_TEXT.institutionalBridge.body[0]}</p>
            <p className="hint">{ROADMAP_TEXT.institutionalBridge.body[1]}</p>
            <p className="hint">{ROADMAP_TEXT.institutionalBridge.body[2]}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage4} alt="Institutional bridge visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.eliteWhy.heading}</h4>
            <p className="hint">{ROADMAP_TEXT.eliteWhy.body}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage5} alt="Elite strategy visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.africaFrontier.heading}</h4>
            <p className="hint">{ROADMAP_TEXT.africaFrontier.body}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage6} alt="Africa frontier visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>{ROADMAP_TEXT.comparison.heading}</h4>
            <p className="hint">Bridge from standard banking behavior to sovereign structure through disciplined controls.</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage7} alt="Comparison framework visual" />
          </div>
        </article>

        <article className="roadmapMediaRow">
          <div className="roadmapMediaTextBox">
            <h4>Partner Trajectory</h4>
            <p className="hint">{ROADMAP_TEXT.partnerLine}</p>
          </div>
          <div className="roadmapMediaImage">
            <img src={roadmapImage8} alt="Partner trajectory visual" />
          </div>
        </article>
      </div>

      <div className="card">
        <p className="label valuesHeading">{ROADMAP_TEXT.institutionalBridge.heading}</p>
        {ROADMAP_TEXT.institutionalBridge.body.map((line) => (
          <p key={line} className="hint">
            {line}
          </p>
        ))}
      </div>

      <div className="dashboardGrid">
        <div className="card">
          <p className="label valuesHeading">{ROADMAP_TEXT.eliteWhy.heading}</p>
          <p className="hint">{ROADMAP_TEXT.eliteWhy.body}</p>
        </div>
        <div className="card">
          <p className="label valuesHeading">{ROADMAP_TEXT.africaFrontier.heading}</p>
          <p className="hint">{ROADMAP_TEXT.africaFrontier.body}</p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{ROADMAP_TEXT.comparison.heading}</p>
        <div className="valuesTable roadmapTable">
          <div className="valuesTableHeader roadmapTableHeader">
            {ROADMAP_TEXT.comparison.headers.map((header, index) => (
              <p key={header} className={index === 3 ? "roadmapNomadHeaderCell" : ""}>
                {header}
              </p>
            ))}
          </div>
          {ROADMAP_TEXT.comparison.rows.map((row) => (
            <div key={row.service} className="valuesTableRow roadmapTableRow">
              <p>{row.service}</p>
              <p>{row.traditional}</p>
              <p>{row.elite}</p>
              <p className="roadmapNomadDataCell">{row.nomad}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="hint">{ROADMAP_TEXT.partnerLine}</p>
      </div>

      <div className="roadmapModulesSection">
        <p className="label valuesHeading">Consolidated Modules</p>
        <p className="hint">
          Roadmap is now the single hub for modules outside the core navigation.
        </p>
        <div className="roadmapModulesStack">
          <article className="roadmapMediaRow">
            <div className="roadmapMediaTextBox">
              <h4>Guide</h4>
              <p className="hint">Nomad Insight, behavior prompts, and discipline responses.</p>
              <Link className="footerLink" to="/app/guide">Open Guide</Link>
            </div>
            <div className="roadmapMediaImage">
              <img src={roadmapImage9} alt="Guide module visual" />
            </div>
          </article>
          <article className="roadmapMediaRow">
            <div className="roadmapMediaTextBox">
              <h4>The Protocol / Rules</h4>
              <p className="hint">Lock engine, reset rule, and operating mechanics.</p>
              <Link className="footerLink" to="/app/protocol">Open Protocol</Link>
            </div>
            <div className="roadmapMediaImage">
              <img src={roadmapImage10} alt="Protocol module visual" />
            </div>
          </article>
          <article className="roadmapMediaRow">
            <div className="roadmapMediaTextBox">
              <h4>Nomad Card / Dynasty / Tax / Knowledge</h4>
              <p className="hint">Future card firewall, legacy flow, tax model, and intelligence docs.</p>
              <div className="actions">
                <Link className="footerLink" to="/app/nomad-card">Nomad Card</Link>
                <Link className="footerLink" to="/app/dynasty">Dynasty</Link>
                <Link className="footerLink" to="/app/tax-efficiency">Tax Efficiency</Link>
                <Link className="footerLink" to="/app/knowledge">Knowledge</Link>
              </div>
            </div>
            <div className="roadmapMediaImage">
              <img src={roadmapImage11} alt="Multi-module visual" />
            </div>
          </article>
          <article className="roadmapMediaRow">
            <div className="roadmapMediaTextBox">
              <h4>Accounts</h4>
              <p className="hint">Connected account management and profile settings.</p>
              <Link className="footerLink" to="/app/accounts">Open Accounts</Link>
            </div>
            <div className="roadmapMediaImage">
              <img src={roadmapImage12} alt="Accounts module visual" />
            </div>
          </article>
        </div>
      </div>

      <div className="roadmapFooterHero">
        <img src={roadmapImage12} alt="Roadmap footer hero visual" />
      </div>

      <PublicFooterNav />
    </div>
  );
}
