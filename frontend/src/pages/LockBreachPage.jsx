import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmUnlock, getDeposits, previewUnlock } from "../api";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";

export default function LockBreachPage() {
  const { lockId } = useParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [lock, setLock] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDeposits()
      .then((data) => {
        const found = (data.deposits || []).find((item) => item._id === lockId);
        setLock(
          found
            ? {
                id: found._id,
                amount: Number(found.amount) || 0,
                state: String(found.state || "LOCKED"),
              }
            : null
        );
      })
      .catch((error) => setStatus(error.message));
  }, [lockId]);

  useEffect(() => {
    if (!lock?.id) return;
    if (lock.state === "MATURED") {
      setStatus("This deposit is matured. Use release flow instead.");
      return;
    }
    previewUnlock({ mode: "single", depositId: lock.id })
      .then((data) => setPreview(data.preview))
      .catch((error) => setStatus(error.message));
  }, [lock]);

  if (!lock) {
    return (
      <div className="page">
        <div className="card">
          <p className="hint">{status || "Lock not found."}</p>
        </div>
      </div>
    );
  }

  const feeAmount = Number(preview?.feeAmount || 0);
  const netAmount = Number(preview?.netAmount || 0);

  const handleConfirm = async () => {
    setLoading(true);
    setStatus("");
    try {
      await confirmUnlock({
        mode: "single",
        depositId: lock.id,
        useEmergency: false,
      });
      navigate(`/app/deposits/${lock.id}/release`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="textTitle">Unlock early</h2>
      <p className="hint">This applies a penalty before funds are released.</p>

      <div className="card">
        <p className="label">Deposit amount</p>
        <p className="amount">{formatCurrency(lock.amount, currency)}</p>
        <p className="label">Penalty range</p>
        <p>{formatCurrency(feeAmount, currency)}</p>
        <p className="label">Estimated net</p>
        <p>{formatCurrency(netAmount, currency)}</p>
        <p className="hint">
          Penalty is calculated on the backend at time of release. Relocking later starts a new timer.
        </p>
        {status ? <p className="status">{status}</p> : null}
      </div>

      <div className="actions">
        <button className="primary" type="button" onClick={handleConfirm} disabled={loading}>
          Confirm early unlock
        </button>
        <button className="ghost" type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Early unlock confirmation.
 */
