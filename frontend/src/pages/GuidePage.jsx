import { useHistory } from "../state/HistoryContext.jsx";
import NomadChat from "../components/NomadChat.jsx";

export default function GuidePage() {
  const { ledgerEvents } = useHistory();

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Guide</h2>
          <p className="pageSubtitle">Read-only discipline coach based on your ledger and audit footprint.</p>
        </div>
      </div>
      <NomadChat history={ledgerEvents} />
    </div>
  );
}
