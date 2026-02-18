import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDisciplineProfile } from "../api.js";
import { useDashboard } from "../state/DashboardContext.jsx";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";

export default function DashboardPage() {
  const { summary, refresh } = useDashboard();
  const { currency } = useCurrency();
  const { user } = useAuth();
  const [discipline, setDiscipline] = useState(null);

  useEffect(() => {
    refresh().catch(() => null);
  }, [refresh]);

  useEffect(() => {
    getDisciplineProfile()
      .then((data) => setDiscipline(data.profile || null))
      .catch(() => setDiscipline(null));
  }, []);

  const potential = (summary?.locked?.totalAmount || 0) + (summary?.matured?.totalAmount || 0);
  const available = summary?.matured?.totalAmount || 0;
  const totalLocked = summary?.locked?.totalAmount || 0;
  const activeLocks = summary?.locked?.count || 0;
  const nextUnlock = summary?.locked?.nextMaturesAt
    ? new Date(summary.locked.nextMaturesAt).toLocaleString()
    : "no active locks";

  const disciplinePoints = Number(discipline?.currentPoints || 0);
  const lockStreak = Number(discipline?.currentStreakDays || 0);
  const disciplineLevel = discipline?.disciplineTier || "seedling";

  const metrics = useMemo(
    () => [
      { label: "available balance", value: formatCurrency(available, currency) },
      { label: "potential balance", value: formatCurrency(potential, currency) },
      { label: "active locks", value: String(activeLocks) },
      { label: "total locked amount", value: formatCurrency(totalLocked, currency) },
      { label: "discipline points", value: String(disciplinePoints) },
      { label: "lock streak", value: `${lockStreak} day${lockStreak === 1 ? "" : "s"}` },
    ],
    [activeLocks, available, currency, disciplinePoints, lockStreak, potential, totalLocked]
  );

  return (
    <div className="page nomadDashboardPage">
      <section className="nomadHero">
        <p className="nomadHello">hello {String(user?.name || "tobi").toLowerCase()}</p>
        <p className="nomadHeroLabel">money you have protected</p>
        <h2 className="nomadHeroValue">{formatCurrency(potential, currency)}</h2>
        <p className="nomadHeroSub">ready to use: {formatCurrency(available, currency)}</p>
      </section>

      <section className="nomadGrid">
        {metrics.map((metric) => (
          <article key={metric.label} className="nomadMetric">
            <p className="nomadMetricLabel">{metric.label}</p>
            <p className="nomadMetricValue">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="nomadCommitment">
        <div>
          <p className="nomadMetricLabel">next unlock</p>
          <p className="nomadMetricValue">{nextUnlock}</p>
        </div>
        <div className="nomadProgress">
          <p className="nomadMetricLabel">discipline level</p>
          <p className="nomadMetricValue">{String(disciplineLevel).toLowerCase()}</p>
        </div>
      </section>

      <section className="nomadLockedRow">
        <article className="nomadLockedItem">
          <p className="nomadMetricLabel">consistency rate</p>
          <p className="nomadMetricComing">locked for now</p>
        </article>
        <article className="nomadLockedItem">
          <p className="nomadMetricLabel">time horizon</p>
          <p className="nomadMetricComing">locked for now</p>
        </article>
        <article className="nomadLockedItem">
          <p className="nomadMetricLabel">credit power</p>
          <p className="nomadMetricComing">locked for now</p>
        </article>
      </section>

      <section className="nomadActions">
        <Link className="primaryLink" to="/app/deposit">new lock</Link>
        <Link className="ghostLink" to="/rules">view rules</Link>
      </section>
    </div>
  );
}

/**
 * FILE ROLE:
 * Dashboard page showing totals and next maturity timing.
 *
 * CONNECTS TO:
 * - state/DashboardContext.jsx
 * - api.js (getDeposits)
 * - components/Dashboard.jsx
 * - utils/currency.js
 *
 * USED BY:
 * - src/App.jsx (/app)
 */

/**
 * CHANGELOG:
 * - Wired copy to TEXT.DASHBOARD.
 * - Added a brief spacing insight block (copy-only).
 */
