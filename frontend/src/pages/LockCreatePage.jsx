import { Link } from "react-router-dom";

export default function LockCreatePage() {
  return (
    <div className="page">
      <h2 className="textTitle">Send money in</h2>
      <p className="hint">
        Locks are created automatically when you deposit. No extra steps.
      </p>

      <div className="card">
        <p className="label">How it works</p>
        <p className="hint">
          Your deposit starts a timer based on the amount. When you deposit again,
          that becomes a new lock.
        </p>
        <div className="actions">
          <Link className="primaryLink" to="/app/deposit">
            Send money in
          </Link>
          <Link className="ghostLink" to="/app/locks">
            View locks
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Create a new lock based on amount rules.
 */
