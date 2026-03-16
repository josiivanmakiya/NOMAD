import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AUTH_FLOW_COPY } from "../auth/authFlowCopy.js";
import { useAccount } from "../../state/AccountContext.jsx";
import { useDashboard } from "../../state/DashboardContext.jsx";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { formatCurrency } from "../../utils/currency.js";
import BankAccountItem from "../../components/settings/BankAccountItem.jsx";
import { getDeposits } from "../../api";
import { getDisciplineProfile } from "../../api";
import { useAuth } from "../../state/AuthContext.jsx";

export default function SafeHomePage() {
  const { home } = AUTH_FLOW_COPY;
  const { accounts } = useAccount();
  const { summary, refresh } = useDashboard();
  const { currency } = useCurrency();
  const { user } = useAuth();

  const [depositCount, setDepositCount] = useState(0);
  const [discipline, setDiscipline] = useState(null);

  useEffect(() => {
    refresh().catch(() => null);
  }, [refresh]);

  useEffect(() => {
    let active = true;
    getDeposits()
      .then((data) => {
        if (!active) return;
        setDepositCount((data.deposits || []).length);
      })
      .catch(() => {
        if (!active) return;
        setDepositCount(0);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getDisciplineProfile()
      .then((data) => {
        if (!active) return;
        setDiscipline(data.profile || null);
      })
      .catch(() => {
        if (!active) return;
        setDiscipline(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const potential =
    (summary?.locked?.totalAmount || 0) + (summary?.matured?.totalAmount || 0);
  const available = summary?.matured?.totalAmount || 0;
  const lockedCount = summary?.locked?.count || 0;
  const nextUnlock = summary?.locked?.nextMaturesAt
    ? new Date(summary.locked.nextMaturesAt).toLocaleString()
    : "No active locks";
  const recurringNudge =
    depositCount <= 0
      ? "After your first deposit, you can activate recurring deposits by amount and schedule."
      : depositCount === 1
        ? "First deposit completed. Recurring deposits are now available."
        : depositCount === 2
          ? "Second deposit completed. Consider weekly or monthly recurring deposits."
          : "Third+ deposit completed. Recurring deposits can keep your lock cycle automatic.";
  const hasLinkedAccount = accounts.length > 0;
  const isTierOneOrHigher = Number(user?.tier || 0) >= 1;
  const nextTierPoints = Number(discipline?.nextTier?.pointsRequired || 0);
  const currentPoints = Number(discipline?.currentPoints || 0);
  const progressPercent =
    nextTierPoints > 0
      ? Math.min((currentPoints / nextTierPoints) * 100, 100)
      : 100;

  return (
    <div className="page safeHomePage">
      <div className="pageHeader">
        <div>
          <p className="label">{home.title}</p>
          <h2 className="textTitle">Safe</h2>
          <p className="pageSubtitle">Balances and lock rules update with every deposit.</p>
        </div>
        <div className="actions">
          {hasLinkedAccount ? (
            <Link className="primaryLink" to="/app/deposit">
              {home.primaryCta}
            </Link>
          ) : (
            <Link className="primaryLink" to="/app/accounts">
              Connect account to deposit
            </Link>
          )}
          <Link className="ghostLink" to="/app/guide">
            Consult Guide
          </Link>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="modeGroup">
          <p className="modeGroupTitle">Read-Only</p>
          <div className="card readOnlySurface">
            <p className="label">Potential Balance</p>
            <p className="amount amountStrong">{formatCurrency(potential, currency)}</p>
            <p className="hint">Next unlock: {nextUnlock}</p>
          </div>

          <div className="summaryGrid">
            <div className="card readOnlySurface">
              <div className="labelRow">
                <p className="label">Available</p>
                <details className="infoHint">
                  <summary aria-label="Available balance info">i</summary>
                  <p>Matured deposits only.</p>
                </details>
              </div>
              <p className="amount">{formatCurrency(available, currency)}</p>
            </div>
            <div className="card readOnlySurface">
              <div className="labelRow">
                <p className="label">Active locks</p>
                <details className="infoHint">
                  <summary aria-label="Active lock info">i</summary>
                  <p>Total locked positions currently counting down.</p>
                </details>
              </div>
              <p className="amount">{lockedCount}</p>
            </div>
          </div>

          <div className="card readOnlySurface">
            <div className="sectionHeaderRow">
              <p className="label">The pulse</p>
              <Link className="textLink" to="/app/deposits">
                View all locks
              </Link>
            </div>
            <div className="list">
              <p className="hint">Lock status: {lockedCount > 0 ? "ACTIVE" : "IDLE"}</p>
              <p className="hint">Protocol currency: {currency}</p>
              <p className="hint">Next maturity checkpoint: {nextUnlock}</p>
            </div>
          </div>
        </div>

        <div className="modeGroup">
          <p className="modeGroupTitle">Actions</p>
          <div className="card actionSurface">
            <p className="label">Rules</p>
            <p className="hint">Lock time is set by amount. Early unlock applies a 3–5% fee.</p>
            <p className="hint">Every tier is fixed and resets on new deposits.</p>
            <div className="rulesHint">
              <Link className="textLink" to="/rules">
                View lock rules
              </Link>
            </div>
          </div>

          <div className="card readOnlySurface">
            <div className="sectionHeaderRow">
              <p className="label">Discipline progress</p>
              <Link className="textLink" to="/rules">
                View reward rules
              </Link>
            </div>
            <p className="hint">
              Tier: {discipline?.disciplineTier || "Seedling"}
            </p>
            <p className="hint">
              Points: {currentPoints}
              {discipline?.nextTier?.tier
                ? ` / Next: ${discipline.nextTier.tier} (${discipline.pointsToNextTier} to go)`
                : " / Max tier reached"}
            </p>
            <p className="hint">
              Streak days: {Number(discipline?.currentStreakDays || 0)}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#1f7a3f] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {discipline?.recentLogs?.length ? (
              <div className="mt-3 list">
                {discipline.recentLogs.slice(0, 3).map((log) => (
                  <p key={log._id} className="hint">
                    {log.action}: {log.points > 0 ? "+" : ""}
                    {log.points}
                  </p>
                ))}
              </div>
            ) : (
              <p className="hint mt-3">No discipline events yet. First maturity starts the score.</p>
            )}
          </div>

          <div className="card actionSurface">
            <p className="label">Tax efficiency</p>
            <p className="hint">
              Learn the Nigerian tax-lock model: VAT/WHT provisioning, EMTL leak reduction, and legacy transfer efficiency.
            </p>
            <div className="actions">
              <Link className="primaryLink" to="/app/tax-efficiency">
                Open Tax Efficiency
              </Link>
            </div>
          </div>

          <div className="card actionSurface">
            <p className="label">Recurring deposits</p>
            <p className="hint">{recurringNudge}</p>
            <p className="hint">
              Nomad processes this safely using verified accounts, tokenized authorization, and auditable logs.
            </p>
            <div className="actions">
              {isTierOneOrHigher ? (
                <Link className="primaryLink" to="/app/protocols">
                  Configure recurring
                </Link>
              ) : (
                <Link className="primaryLink" to="/verify/identity">
                  Complete Tier 1 first
                </Link>
              )}
            </div>
          </div>

          <div className="card actionSurface">
            <div className="sectionHeaderRow">
              <p className="label">Funding accounts</p>
              <Link className="textLink" to="/app/accounts">
                Manage
              </Link>
            </div>
            <p className="hint">
              Linked accounts fund the Safe and receive releases.
            </p>
            <div className="settingsList">
              {accounts.length === 0 ? (
                <div className="list">
                  <p className="hint">No accounts yet.</p>
                  <Link className="primaryLink" to="/app/accounts">
                    Add account
                  </Link>
                </div>
              ) : (
                accounts.map((account) => (
                  <BankAccountItem
                    key={`home-${account.id}`}
                    bank={account.bankName}
                    masked={`•••• ${account.last4}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Safe home after completing setup flow.
 *
 * CONNECTS TO:
 * - content/authFlowCopy.js
 *
 * USED BY:
 * - src/App.jsx (/home)
 */

