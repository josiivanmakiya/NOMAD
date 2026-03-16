import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDeposits, previewDeposit } from "../../api";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { TEXT } from "../../content/text.js";

export default function RelockConfirmPage() {
  const { depositId } = useParams();
  const [preview, setPreview] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    getDeposits()
      .then((data) => {
        const found = (data.deposits || []).find((item) => item._id === depositId);
        setDeposit(found || null);
      })
      .catch(() => null);
  }, [depositId]);

  useEffect(() => {
    const amountForPreview = deposit?.amount || 1;
    previewDeposit(amountForPreview)
      .then((data) => setPreview(data.preview))
      .catch(() => null);
  }, [deposit]);

  return (
    <div className="page">
      <h2>Relock deposit</h2>
      <p className="hint">Start a fresh lock window for this amount.</p>
      <div className="card">
        <p className="label">Deposit amount</p>
        <p className="amount">
          {deposit ? formatCurrency(deposit.amount, currency) : "—"}
        </p>
        <p className="label">Current status</p>
        <p className={`badge badge-${deposit?.state?.toLowerCase() || "locked"}`}>
          {deposit?.state || "LOCKED"}
        </p>
        <p className="label">Deposit ID</p>
        <p className="mono">{depositId}</p>
      </div>

      <div className="card">
        <p className="label">New lock duration</p>
        <p>{preview?.lockDurationMs ? `${Math.round(preview.lockDurationMs / 3600000)}h` : "—"}</p>
        <p className="label">New maturity</p>
        <p>{preview?.maturesAt ? new Date(preview.maturesAt).toLocaleString() : "—"}</p>
        <p className="hint">Relocking starts a new timer immediately.</p>
      </div>

      <div className="actions">
        <button className="primary" disabled>
          Relock now
        </button>
        <Link className="ghostLink" to={`/app/deposits/${depositId}`}>
          Back to deposit
        </Link>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Placeholder relock page (future delay-again flow).
 *
 * CONNECTS TO:
 * - api.js (previewDeposit)
 *
 * USED BY:
 * - src/App.jsx (/app/deposits/:depositId/relock)
 *
 * NOTES:
 * - Backend relock support is not implemented yet.
 */

/**
 * CHANGELOG:
 * - Wired copy to TEXT.RELOCK.
 */

