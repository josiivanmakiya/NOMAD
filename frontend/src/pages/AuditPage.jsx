const DUMMY_AUDIT = [
  { id: "a_001", at: "2026-02-11T08:04:11Z", event: "Logged in from 102.89.4.21" },
  { id: "a_002", at: "2026-02-11T08:10:03Z", event: "Timer reset due to new deposit (14 days)" },
  { id: "a_003", at: "2026-02-11T08:17:42Z", event: "Primary currency changed to USD (display only)" },
  { id: "a_004", at: "2026-02-11T09:01:09Z", event: "Early withdrawal preview opened" },
];

export default function AuditPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Audit</h2>
          <p className="pageSubtitle">Read-only security and activity transparency log.</p>
        </div>
      </div>

      <div className="card">
        <p className="label">Activity log</p>
        <div className="ledgerList">
          {DUMMY_AUDIT.map((row) => (
            <div key={row.id} className="ledgerRow">
              <div className="ledgerBody">
                <p className="ledgerTitle">{row.event}</p>
                <p className="ledgerMeta">{row.id}</p>
              </div>
              <div className="ledgerSide">
                <p className="ledgerTime">{new Date(row.at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
