import { DYNASTY_TEXT } from "../content/dynastyText.js";
import PublicFooterNav from "../components/PublicFooterNav.jsx";
import dynastyImage1 from "../../images/Screenshot 2026-02-17 223015.png";
import dynastyImage2 from "../../images/Screenshot 2026-02-17 223749.png";
import dynastyImage3 from "../../images/Screenshot 2026-02-17 223630.png";
import dynastyImage4 from "../../images/Screenshot 2026-02-17 222538.png";
import dynastyImage5 from "../../images/Screenshot 2026-02-17 223401.png";
import dynastyImage6 from "../../images/Screenshot 2026-02-17 223311.png";
import dynastyImage7 from "../../images/the problem.png";
import dynastyImage8 from "../../images/Screenshot 2026-02-17 223113.png";

export default function DynastyPage() {
  return (
    <div className="page dynastyPage">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">{DYNASTY_TEXT.page.title}</h2>
          <p className="pageSubtitle">{DYNASTY_TEXT.page.subtitle}</p>
        </div>
        <div className="actions">
          <span className="protocolTag">{DYNASTY_TEXT.page.status}</span>
        </div>
      </div>

      <div className="card">
        <p className="hint">{DYNASTY_TEXT.opening}</p>
      </div>

      <div className="dynastyMediaStack">
        <div className="dynastyMediaSlot">
          <img src={dynastyImage1} alt="Dynasty legacy visual one" />
          <div className="dynastyMediaOverlay">
            <h4>Protect Multi-Generation Capital</h4>
          </div>
        </div>
        <div className="dynastyMediaSlot">
          <img src={dynastyImage2} alt="Dynasty legacy visual two" />
          <div className="dynastyMediaOverlay">
            <h4>Transfer With Discipline, Not Chaos</h4>
          </div>
        </div>
        <div className="dynastyMediaSlot">
          <img src={dynastyImage3} alt="Dynasty legacy visual three" />
          <div className="dynastyMediaOverlay">
            <h4>Build Structured Family Continuity</h4>
          </div>
        </div>
      </div>

      <div className="card dynastySplitCard">
        <div className="dynastySplitText">
          <p className="label valuesHeading">{DYNASTY_TEXT.legacyLock.heading}</p>
          <div className="list">
            {DYNASTY_TEXT.legacyLock.points.map((point) => (
              <p key={point} className="hint">
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="dynastySplitImage">
          <img src={dynastyImage4} alt="Legacy lock visual" />
        </div>
      </div>

      <div className="card dynastySplitCard">
        <div className="dynastySplitText">
          <p className="label valuesHeading">{DYNASTY_TEXT.legalModel.heading}</p>
          <div className="list">
            {DYNASTY_TEXT.legalModel.points.map((point) => (
              <p key={point} className="hint">
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="dynastySplitImage">
          <img src={dynastyImage5} alt="Legal model visual" />
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{DYNASTY_TEXT.math.heading}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader antiBankTableHeader">
            {DYNASTY_TEXT.math.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {DYNASTY_TEXT.math.rows.map((row) => (
            <div key={row.label} className="valuesTableRow antiBankTableRow">
              <p>{row.label}</p>
              <p>{row.monthly}</p>
              <p>{row.outcome}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card dynastySplitCard">
        <div className="dynastySplitText">
          <p className="label valuesHeading">{DYNASTY_TEXT.hNwi.heading}</p>
          <p className="hint">{DYNASTY_TEXT.hNwi.body}</p>
        </div>
        <div className="dynastySplitImage">
          <img src={dynastyImage6} alt="HNWI strategy visual" />
        </div>
      </div>

      <div className="card dynastySplitCard">
        <div className="dynastySplitText">
          <p className="label valuesHeading">{DYNASTY_TEXT.handoverProtocol.heading}</p>
          <p className="hint">{DYNASTY_TEXT.handoverProtocol.body}</p>
          <div className="list">
            {DYNASTY_TEXT.handoverProtocol.points.map((point) => (
              <p key={point} className="hint">
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="dynastySplitImage">
          <img src={dynastyImage7} alt="Handover protocol visual" />
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{DYNASTY_TEXT.stories.heading}</p>
        <div className="list">
          {DYNASTY_TEXT.stories.items.map((story) => (
            <div key={story.title} className="cardMuted">
              <p className="label valuesHeading">{story.title}</p>
              <p className="hint">{story.roleLine}</p>
              <div className="list">
                {story.points.map((point) => (
                  <p key={point} className="hint">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">{DYNASTY_TEXT.summaryTable.heading}</p>
        <div className="valuesTable">
          <div className="valuesTableHeader dynastySummaryHeader">
            {DYNASTY_TEXT.summaryTable.headers.map((header) => (
              <p key={header}>{header}</p>
            ))}
          </div>
          {DYNASTY_TEXT.summaryTable.rows.map((row) => (
            <div key={row.action} className="valuesTableRow dynastySummaryRow">
              <p>{row.action}</p>
              <p>{row.result}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="hint">{DYNASTY_TEXT.closing}</p>
      </div>

      <div className="dynastyFooterMedia">
        <div className="dynastyFooterMediaSlot">
          <img src={dynastyImage8} alt="Dynasty footer visual one" />
        </div>
        <div className="dynastyFooterMediaSlot">
          <img src={dynastyImage5} alt="Dynasty footer visual two" />
        </div>
        <div className="dynastyFooterMediaSlot">
          <img src={dynastyImage3} alt="Dynasty footer visual three" />
        </div>
        <div className="dynastyFooterMediaSlot">
          <img src={dynastyImage1} alt="Dynasty footer visual four" />
        </div>
      </div>

      <PublicFooterNav />
    </div>
  );
}
