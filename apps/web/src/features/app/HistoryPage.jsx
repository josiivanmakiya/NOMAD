import { useState } from "react";
import { useHistory } from "../../state/HistoryContext.jsx";
import LedgerList from "../../components/history/LedgerList.jsx";
import NomadChat from "../../components/NomadChat.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";

export default function HistoryPage() {
  const { ledgerEvents, historyError } = useHistory();
  const { currency } = useCurrency();
  const [selected, setSelected] = useState(null);
  const frictionFeesPaidMinor = ledgerEvents
    .filter((event) => event.type === "LOCK_RESET")
    .reduce((sum, event) => sum + Math.max(0, Number(event.amountMinor || 0)), 0);

  const exportCsv = () => {
    const header = "id,timestamp,type,amountMinor,currency,balanceAfterMinor,description";
    const rows = ledgerEvents.map((event) =>
      [
        event.id,
        event.timestamp,
        event.type,
        event.amountMinor ?? 0,
        event.currency,
        event.balanceAfterMinor ?? 0,
        `"${String(event.description || "").replaceAll("\"", "\"\"")}"`,
      ].join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nomad-ledger.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">History</h2>
          <p className="pageSubtitle">Ledger view of activity and timing.</p>
        </div>
        <div className="actions">
          <button className="ghost" type="button" onClick={exportCsv}>
            Export CSV
          </button>
          <button className="ghost" type="button" onClick={exportPdf}>
            Export PDF
          </button>
        </div>
      </div>

      <div className="card readOnlySurface">
        <p className="label">Friction fees paid</p>
        <p className="amount">{formatCurrency(frictionFeesPaidMinor / 100, currency)}</p>
        <p className="hint">Cold total of penalties from early unlock behavior.</p>
      </div>
      {historyError ? <p className="status">{historyError}</p> : null}

      <div className="dashboardGrid">
        <div className="modeGroup">
          <p className="modeGroupTitle">Read-Only</p>
          <LedgerList events={ledgerEvents} onSelect={setSelected} />
        </div>

        <div className="modeGroup">
          <p className="modeGroupTitle">Actions</p>
          <div className="card readOnlySurface">
            <p className="label">Details</p>
            {selected ? (
              <div className="profileFields">
                <div>
                  <p className="profileLabel">Type</p>
                  <p className="profileValue">{selected.type}</p>
                </div>
                <div>
                  <p className="profileLabel">Amount</p>
                  <p className="profileValue">
                    {Number(selected.amountMinor || 0) > 0
                      ? formatCurrency(selected.amountMinor / 100, currency)
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="profileLabel">Currency</p>
                  <p className="profileValue">{selected.currency}</p>
                </div>
                <div>
                  <p className="profileLabel">Balance after</p>
                  <p className="profileValue">
                    {formatCurrency(Number(selected.balanceAfterMinor || 0) / 100, currency)}
                  </p>
                </div>
                <div>
                  <p className="profileLabel">Timestamp</p>
                  <p className="profileValue">{new Date(selected.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="profileLabel">Note</p>
                  <p className="profileValue">{selected.description}</p>
                </div>
              </div>
            ) : (
              <p className="hint">Select a transaction to view details.</p>
            )}
          </div>

          <div className="actionSurface">
            <NomadChat />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * History page with backend ledger events and NOMAD chat.
 */

