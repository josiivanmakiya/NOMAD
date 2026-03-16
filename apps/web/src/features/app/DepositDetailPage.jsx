import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDeposits, previewRelease, previewUnlock } from "../../api";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { TEXT } from "../../content/text.js";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

export default function DepositDetailPage() {
  const { depositId } = useParams();
  const [deposit, setDeposit] = useState(null);
  const [releasePreview, setReleasePreview] = useState(null);
  const [unlockPreview, setUnlockPreview] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    getDeposits().then((data) => {
      const found = (data.deposits || []).find((item) => item._id === depositId);
      setDeposit(found || null);
    });
  }, [depositId]);

  useEffect(() => {
    if (!deposit) return;
    if (deposit.state === "MATURED") {
      previewRelease(depositId)
        .then((data) => setReleasePreview(data.preview))
        .catch(() => null);
      return;
    }

    previewUnlock({ mode: "single", depositId })
      .then((data) => setUnlockPreview(data.preview))
      .catch(() => null);
  }, [deposit, depositId]);

  if (!deposit) {
    return (
      <div className="page">
        <h2>{TEXT.DEPOSIT_DETAIL.title}</h2>
        <p className="hint">{TEXT.DEPOSIT_DETAIL.loading}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>{TEXT.DEPOSIT_DETAIL.title}</h2>
      <p className="hint">{TEXT.DEPOSIT_DETAIL.subtitle}</p>
      <div className="card">
        <p className="label">{TEXT.DEPOSIT_DETAIL.labels.amount}</p>
        <p className="amount">
          {formatCurrency(deposit.amount, currency)}
        </p>
        <p className="label">{TEXT.DEPOSIT_DETAIL.labels.status}</p>
        <p className={`badge badge-${deposit.state?.toLowerCase()}`}>{deposit.state}</p>
        <p className="label">{TEXT.DEPOSIT_DETAIL.labels.maturity}</p>
        <p>{formatDate(deposit.lock?.maturesAt)}</p>
        <p className="label">{TEXT.DEPOSIT_DETAIL.labels.rule}</p>
        <p>{deposit.ruleVersion}</p>
      </div>

      <div className="card">
        <h3>{TEXT.DEPOSIT_DETAIL.preview.title}</h3>
        {deposit.state === "MATURED" ? (
          <>
            <p className="label">{TEXT.DEPOSIT_DETAIL.preview.penalty}</p>
            <p>{formatCurrency(0, currency)}</p>
            <p className="label">{TEXT.DEPOSIT_DETAIL.preview.net}</p>
            <p>{formatCurrency(releasePreview?.netAmount, currency)}</p>
          </>
        ) : (
          <>
            <p className="label">{TEXT.DEPOSIT_DETAIL.preview.earlyFee}</p>
            <p>{formatCurrency(unlockPreview?.feeAmount, currency)}</p>
            <p className="label">{TEXT.DEPOSIT_DETAIL.preview.net}</p>
            <p>{formatCurrency(unlockPreview?.netAmount, currency)}</p>
          </>
        )}
      </div>

      <div className="actions">
        <Link className="ghostLink" to={`/app/deposits/${depositId}/relock`}>
          {TEXT.DEPOSIT_DETAIL.actions.relock}
        </Link>
        <Link className="primaryLink" to={`/app/deposits/${depositId}/release`}>
          {TEXT.DEPOSIT_DETAIL.actions.release}
        </Link>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Detail view for a single deposit with release/early unlock preview.
 *
 * CONNECTS TO:
 * - api.js (getDeposits, previewRelease, previewUnlock)
 * - utils/currency.js
 * - state/CurrencyContext.jsx
 *
 * USED BY:
 * - src/App.jsx (/app/deposits/:depositId)
 */

/**
 * CHANGELOG:
 * - Wired copy to TEXT.DEPOSIT_DETAIL.
 */

