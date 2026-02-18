export default function TimeLawsPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">Time laws</p>
        <div className="list">
          <p className="hint">Time is server-owned and authoritative.</p>
          <p className="hint">Lock duration is derived only from total locked amount.</p>
          <p className="hint">Any new deposit or relock resets the timer from now.</p>
          <p className="hint">Early unlock resets all active locks.</p>
          <p className="hint">Matured funds are never penalized.</p>
          <p className="hint">Timers cannot be shortened or edited.</p>
          <p className="hint">Retries must be idempotent.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Read-only time laws page.
 */
