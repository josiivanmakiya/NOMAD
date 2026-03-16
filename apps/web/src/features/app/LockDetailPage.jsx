import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeposits } from "../../api";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const formatRemaining = (maturityValue) => {
  if (!maturityValue) return "—";
  const maturityTime = new Date(maturityValue).getTime();
  const diff = Math.max(0, maturityTime - Date.now());
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export default function LockDetailPage() {
  const { lockId } = useParams();
  const [lock, setLock] = useState(null);
  const [status, setStatus] = useState("");
  const { currency } = useCurrency();

  useEffect(() => {
    getDeposits()
      .then((data) => {
        const found = (data.deposits || []).find((item) => item._id === lockId);
        if (!found) {
          setLock(null);
          return;
        }
        setLock({
          id: found._id,
          amount: Number(found.amount) || 0,
          status: String(found.state || "LOCKED").toLowerCase(),
          maturityTime: found.lock?.maturesAt,
          startTime: found.lock?.startedAt || found.createdAt,
          lockDurationDays: found.lock?.durationDays || 0,
        });
      })
      .catch((error) => setStatus(error.message));
  }, [lockId]);

  if (!lock) {
    return (
      <div className="page">
        <div className="card">
          <p className="hint">{status || "Lock not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="textTitle">Lock</h2>
      <p className="hint">A single deposit with its own timer.</p>

      <div className="card">
        <p className="label">Amount</p>
        <p className="amount">{formatCurrency(lock.amount, currency)}</p>
        <p className="label">Status</p>
        <p className={`badge badge-${lock.status}`}>{lock.status}</p>
        <p className="label">Maturity</p>
        <p>{formatDateTime(lock.maturityTime)}</p>
        {lock.status === "locked" && (
          <>
            <p className="label">Remaining</p>
            <p>{formatRemaining(lock.maturityTime)}</p>
          </>
        )}
      </div>

      <div className="card">
        <p className="label">Started at</p>
        <p>{formatDateTime(lock.startTime)}</p>
        <p className="label">Duration</p>
        <p>{lock.lockDurationDays} days</p>
      </div>

      <div className="actions">
        {lock.status === "locked" && (
          <Link className="ghostLink" to={`/app/locks/${lock.id}/breach`}>
            Unlock early
          </Link>
        )}
        {lock.status === "matured" && (
          <Link className="primaryLink" to={`/app/deposits/${lock.id}/relock`}>
            Relock
          </Link>
        )}
        <Link className="ghostLink" to="/app/locks">
          Back to locks
        </Link>
      </div>

      <p className="hint">Each deposit is its own timer.</p>
    </div>
  );
}

/**
 * FILE ROLE:
 * Single lock detail with actions.
 */

