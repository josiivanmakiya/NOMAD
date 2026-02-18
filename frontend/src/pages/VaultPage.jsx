import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDeposits } from "../api.js";
import { useCurrency } from "../state/CurrencyContext.jsx";
import { useDashboard } from "../state/DashboardContext.jsx";
import { useHistory } from "../state/HistoryContext.jsx";
import { formatCurrency } from "../utils/currency.js";

const toLowerStatus = (value) => String(value || "").toLowerCase();

const isLockedDeposit = (deposit) => toLowerStatus(deposit?.state) === "locked";

const isMaturedDeposit = (deposit) => {
  const state = toLowerStatus(deposit?.state);
  return state === "matured" || state === "released" || state === "release_ready";
};

const formatRemainingDays = (value) => {
  if (!value) return "no date";
  const now = Date.now();
  const target = new Date(value).getTime();
  if (Number.isNaN(target) || target <= now) return "ready now";
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.ceil((target - now) / dayMs);
  return `${days} day${days === 1 ? "" : "s"}`;
};

const formatEventTime = (value) => {
  if (!value) return "no time";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "no time";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }).toLowerCase();
};

const normalizeEventLabel = (value) => {
  if (!value) return "activity";
  return String(value).replaceAll("_", " ").toLowerCase();
};

export default function VaultPage() {
  const [deposits, setDeposits] = useState([]);
  const [error, setError] = useState("");
  const { currency } = useCurrency();
  const { summary, refresh } = useDashboard();
  const { ledgerEvents, historyError } = useHistory();

  useEffect(() => {
    refresh().catch(() => null);
    getDeposits()
      .then((data) => {
        setDeposits(Array.isArray(data?.deposits) ? data.deposits : []);
        setError("");
      })
      .catch((apiError) => {
        setDeposits([]);
        setError(apiError.message || "could not load vault data");
      });
  }, [refresh]);

  const lockedDeposits = useMemo(
    () => deposits.filter(isLockedDeposit),
    [deposits]
  );

  const maturedDeposits = useMemo(
    () => deposits.filter(isMaturedDeposit),
    [deposits]
  );

  const lockedAmount = useMemo(
    () => lockedDeposits.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [lockedDeposits]
  );

  const maturedAmount = useMemo(
    () => maturedDeposits.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [maturedDeposits]
  );

  const fallbackTotal = lockedAmount + maturedAmount;
  const totalVaultValue = (summary?.locked?.totalAmount || 0) + (summary?.matured?.totalAmount || 0);
  const nextMaturityLabel = formatRemainingDays(summary?.locked?.nextMaturesAt);

  const activeLocks = useMemo(() => {
    const sorted = [...lockedDeposits].sort((a, b) => {
      const aTime = new Date(a?.lock?.maturesAt || 0).getTime();
      const bTime = new Date(b?.lock?.maturesAt || 0).getTime();
      return aTime - bTime;
    });
    return sorted.slice(0, 6);
  }, [lockedDeposits]);

  const recentEvents = useMemo(() => {
    const sorted = [...ledgerEvents].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sorted.slice(0, 5);
  }, [ledgerEvents]);

  return (
    <div className="page vaultPage">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">vault</h2>
          <p className="pageSubtitle">
            simple view for locked money, release timing, and next actions.
          </p>
        </div>
      </div>

      <section className="vaultKpiGrid">
        <div className="card vaultKpiCard">
          <p className="label">total vault value</p>
          <p className="vaultKpiValue">{formatCurrency(totalVaultValue || fallbackTotal, currency)}</p>
          <p className="hint">all active locks combined</p>
        </div>
        <div className="card vaultKpiCard">
          <p className="label">locked now</p>
          <p className="vaultKpiValue">{formatCurrency(summary?.locked?.totalAmount || lockedAmount, currency)}</p>
          <p className="hint">funds under active time lock</p>
        </div>
        <div className="card vaultKpiCard">
          <p className="label">ready to release</p>
          <p className="vaultKpiValue">{formatCurrency(summary?.matured?.totalAmount || maturedAmount, currency)}</p>
          <p className="hint">matured and eligible for action</p>
        </div>
        <div className="card vaultKpiCard">
          <p className="label">next maturity</p>
          <p className="vaultKpiValue">{nextMaturityLabel}</p>
          <p className="hint">closest lock completion</p>
        </div>
      </section>

      <section className="vaultMainGrid">
        <div className="card">
          <p className="label">active locks</p>
          <div className="vaultLockList">
            {activeLocks.length === 0 ? (
              <p className="hint">no active locks yet</p>
            ) : (
              activeLocks.map((lock, index) => (
                <article key={lock._id || `${lock.amount}-${index}`} className="vaultLockItem">
                  <div>
                    <h4>lock {index + 1}</h4>
                    <p className="hint">{toLowerStatus(lock.state) || "locked"}</p>
                  </div>
                  <div className="vaultLockMeta">
                    <p>{formatCurrency(Number(lock.amount) || 0, currency)}</p>
                    <span>{formatRemainingDays(lock?.lock?.maturesAt)}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <p className="label">quick actions</p>
          <div className="vaultActionList">
            <Link to="/app/deposit" className="ghostLink vaultActionButton">start new lock</Link>
            <Link to="/app/deposits" className="ghostLink vaultActionButton">review maturity queue</Link>
            <Link to="/app/deposits" className="ghostLink vaultActionButton">open release simulator</Link>
            <Link to="/app/history" className="ghostLink vaultActionButton">view discipline history</Link>
          </div>
        </div>
      </section>

      <section className="vaultMainGrid">
        <div className="card">
          <p className="label">activity</p>
          <div className="vaultFeed">
            {recentEvents.length === 0 ? (
              <p className="hint">no activity yet</p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id || `${event.type}-${event.timestamp}`} className="vaultFeedRow">
                  <p>{normalizeEventLabel(event.type)}</p>
                  <span>{formatEventTime(event.timestamp)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <p className="label">notes</p>
          {error ? <p className="status">{error}</p> : null}
          {historyError ? <p className="status">{historyError}</p> : null}
          {!error && !historyError ? (
            <p className="hint">live data connected from dashboard summary, deposits, and history.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
