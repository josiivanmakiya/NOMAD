export default function AddAccountButton({ label, onClick, disabled = false }) {
  return (
    <button
      className="ghost addAccountButton"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

/**
 * FILE ROLE:
 * Button for adding a funding or withdrawal account.
 */
