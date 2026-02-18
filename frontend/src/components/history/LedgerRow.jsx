import { formatCurrency } from "../../utils/currency.js";

const formatTimestamp = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function LedgerRow({ event, onSelect }) {
  const amount =
    event.amountMinor && event.amountMinor > 0
      ? formatCurrency(event.amountMinor / 100, event.currency)
      : null;

  return (
    <button className="ledgerRow ledgerRowInteractive" type="button" onClick={() => onSelect(event)}>
      <div className="ledgerBody">
        <p className="ledgerTitle">{event.description}</p>
        <p className="ledgerMeta">{event.type}</p>
      </div>
      <div className="ledgerSide">
        {amount ? <p className="ledgerAmount">{amount}</p> : <p className="ledgerAmount">—</p>}
        <p className="ledgerTime">{formatTimestamp(event.timestamp)}</p>
      </div>
    </button>
  );
}

/**
 * FILE ROLE:
 * Single ledger event row.
 */
