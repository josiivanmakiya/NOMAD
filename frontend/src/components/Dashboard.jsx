const formatCountdown = (value) => {
  if (!value) return "No active maturity window.";
  const target = new Date(value).getTime();
  if (Number.isNaN(target)) return "No active maturity window.";
  const deltaMs = Math.max(target - Date.now(), 0);
  const hours = Math.floor(deltaMs / (1000 * 60 * 60));
  const minutes = Math.floor((deltaMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default function Dashboard({ balances, nextMaturityAt }) {
  return (
    <div className="dashboardStack">
      <div className="card">
        <p className="label">Maturity Monitor</p>
        <p className="hint">Next unlock window: {formatCountdown(nextMaturityAt)}</p>
      </div>
      <div className="balanceSummary">
        <div className="balanceCard">
          <h4>Total Preserved</h4>
          <p className="balancePotential">{balances.potential}</p>
        </div>
        <div className="balanceCard">
          <h4>Available to Release</h4>
          <p className="balanceAvailable">{balances.available}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Displays high-level balances in the dashboard view.
 *
 * CONNECTS TO:
 * - pages/DashboardPage.jsx
 *
 * USED BY:
 * - pages/DashboardPage.jsx
 */
