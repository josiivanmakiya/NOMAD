import LedgerRow from "./LedgerRow.jsx";

export default function LedgerList({ events, onSelect }) {
  return (
    <div className="ledgerList">
      {events.map((event) => (
        <LedgerRow key={event.id} event={event} onSelect={onSelect} />
      ))}
    </div>
  );
}

/**
 * FILE ROLE:
 * Ledger list for history.
 */
