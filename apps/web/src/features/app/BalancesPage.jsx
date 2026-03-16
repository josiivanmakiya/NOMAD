import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { formatCurrency } from "../../utils/currency.js";

export default function BalancesPage() {
  const [summary, setSummary] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    getDashboardSummary()
      .then(data => setSummary(data.summary || data))
      .catch(() => setSummary(null));
  }, []);

  const potential = summary?.totalLocked ?? 0;
  const available = summary?.availableBalance ?? 0;

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Balances</h2>
          <p className="pageSubtitle">Available is matured. Potential is total.</p>
        </div>
      </div>
      <div className="dashboardGrid">
        <div className="dashboardStack">
          <div className="summaryGrid">
            <div className="card">
              <p className="label">Potential balance</p>
              <p className="hint">All deposits combined</p>
              <p className="amount">{formatCurrency(potential, currency)}</p>
            </div>
            <div className="card">
              <p className="label">Available balance</p>
              <p className="hint">Matured deposits only</p>
              <p className="amount">{formatCurrency(available, currency)}</p>
            </div>
          </div>
        </div>
        <div className="dashboardStack">
          <div className="card">
            <p className="label">Interpretation</p>
            <p className="hint">
              Potential includes all deposits. Available includes only matured deposits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
