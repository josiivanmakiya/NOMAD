export default function BankAccountItem({ bank, masked, onRemove }) {
  return (
    <div className="bankItem">
      <div>
        <p className="settingsItemTitle">{bank}</p>
        <p className="hint">{masked}</p>
      </div>
      {onRemove ? (
        <button className="ghost" type="button" onClick={onRemove}>
          Remove
        </button>
      ) : null}
    </div>
  );
}

/**
 * FILE ROLE:
 * Read-only bank account row with a remove action placeholder.
 */
