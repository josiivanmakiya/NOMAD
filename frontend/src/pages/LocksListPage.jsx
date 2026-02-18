import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getDeposits } from "../api";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
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

export default function LocksListPage() {
  const [deposits, setDeposits] = useState([]);
  const [status, setStatus] = useState("");
  const { currency } = useCurrency();

  useEffect(() => {
    getDeposits()
      .then((data) => setDeposits(data.deposits || []))
      .catch((error) => setStatus(error.message));
  }, []);

  const locks = useMemo(
    () =>
      deposits.map((deposit) => ({
        id: deposit._id,
        amount: Number(deposit.amount) || 0,
        status: String(deposit.state || "LOCKED").toLowerCase(),
        maturityTime: deposit.lock?.maturesAt,
      })),
    [deposits]
  );

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Deposits</h2>
          <p className="pageSubtitle">Every deposit has its own timer.</p>
        </div>
        <div className="actions">
          <Link className="primaryLink" to="/app/deposit">
            Make a deposit
          </Link>
          <Link className="ghostLink" to="/app/balances">
            View balances
          </Link>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          <div className="list">
            {status ? (
              <div className="card">
                <p className="status">{status}</p>
              </div>
            ) : null}
            {locks.length === 0 ? (
              <div className="card">
                <div className="formSection">
                  <p className="sectionTitle">No deposits yet</p>
                  <p className="sectionHint">Make your first deposit to start a timer.</p>
                </div>
                <div className="actions">
                  <Link className="primaryLink" to="/app/deposit">
                    Make a deposit
                  </Link>
                </div>
              </div>
            ) : (
              locks.map((lock) => (
                <Link key={lock.id} className="listItem listItemTight" to={`/app/locks/${lock.id}`}>
                  <div className="kv">
                    <p className="label">Amount</p>
                    <p className="amount">{formatCurrency(lock.amount, currency)}</p>
                  </div>
                  <div className="kv">
                    <p className="label">Status</p>
                    <p>{lock.status}</p>
                  </div>
                  <div className="kv">
                    <p className="label">Time left</p>
                    <p>
                      {lock.status === "locked"
                        ? formatRemaining(lock.maturityTime)
                        : formatDate(lock.maturityTime)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="dashboardStack">
          <div className="card">
            <p className="label">Rules</p>
            <p className="hint">
              Timers reset when new deposits arrive or when you relock.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * List of locks with timers and status.
 */
