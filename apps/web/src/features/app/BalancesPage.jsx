import { useLocks } from "../../state/LockContext.jsx";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { formatCurrency } from "../../utils/currency.js";

export default function BalancesPage() {
  const { balances } = useLocks();
  const { currency } = useCurrency();

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
              <p className="amount">{formatCurrency(balances.potentialBalance, currency)}</p>
            </div>
            <div className="card">
              <p className="label">Available balance</p>
              <p className="hint">Matured deposits only</p>
              <p className="amount">{formatCurrency(balances.availableBalance, currency)}</p>
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

/**
 * FILE ROLE:
 * Balance overview with period filters.
 */

