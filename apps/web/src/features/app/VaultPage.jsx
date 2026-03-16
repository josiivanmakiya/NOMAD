import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeposits } from "../../api.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import { formatCurrency } from "../../utils/currency.js";
import NomadShell from "../../components/NomadShell.jsx";

const toLower = (v) => String(v || "").toLowerCase();
const isLocked = (d) => toLower(d?.state) === "locked";
const isMatured = (d) => ["matured","released","release_ready"].includes(toLower(d?.state));

const formatRemaining = (value) => {
  if (!value) return "no date";
  const diff = Math.max(0, new Date(value).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h`;
  return "Ready";
};

const formatDate = (v) => v ? new Date(v).toLocaleDateString() : "—";

export default function VaultPage() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    getDeposits()
      .then(data => setDeposits(data?.deposits || data || []))
      .catch(() => setDeposits([]))
      .finally(() => setLoading(false));
  }, []);

  const locked = useMemo(() => deposits.filter(isLocked), [deposits]);
  const matured = useMemo(() => deposits.filter(isMatured), [deposits]);
  const totalLocked = useMemo(() => locked.reduce((s, d) => s + (d.amount || 0), 0), [locked]);
  const totalMatured = useMemo(() => matured.reduce((s, d) => s + (d.amount || 0), 0), [matured]);
  const nextMaturity = useMemo(() => {
    const dates = locked.map(d => d.maturityDate).filter(Boolean).sort();
    return dates[0] || null;
  }, [locked]);

  return (
    <NomadShell
      title="VAULT"
      sub="Your locked capital — all in one place"
      action={{ label: "+ New Lock", onClick: () => navigate("/app/deposit") }}
    >
      <div className="ns-stat-grid">
        <div className="ns-stat">
          <div className="ns-stat-label">Total Locked</div>
          <div className="ns-stat-val white">
            {loading ? "—" : formatCurrency(totalLocked, currency)}
          </div>
          <div className="ns-stat-sub">{locked.length} active locks</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Ready to Release</div>
          <div className="ns-stat-val green">
            {loading ? "—" : formatCurrency(totalMatured, currency)}
          </div>
          <div className="ns-stat-sub">{matured.length} matured</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Next Maturity</div>
          <div className="ns-stat-val white" style={{fontSize:"clamp(20px,2vw,32px)"}}>
            {loading ? "—" : nextMaturity ? formatRemaining(nextMaturity) : "None"}
          </div>
          <div className="ns-stat-sub">
            {nextMaturity ? `Matures ${formatDate(nextMaturity)}` : "No active locks"}
          </div>
        </div>
      </div>

      <div className="ns-section-header">
        <div className="ns-section-title">Locked Now</div>
        <button className="ns-link-btn" onClick={() => navigate("/app/locks")}>View All →</button>
      </div>
      <div className="ns-table">
        {loading ? (
          <div className="ns-empty">Loading vault...</div>
        ) : locked.length === 0 ? (
          <div className="ns-empty">No active locks — start locking capital</div>
        ) : locked.map(d => (
          <div
            className="ns-row"
            key={d._id || d.id}
            style={{gridTemplateColumns:"4px 1fr auto"}}
            onClick={() => navigate(`/app/locks/${d._id || d.id}`)}
          >
            <div style={{width:"3px",height:"44px",background:"rgba(242,237,232,0.3)",borderRadius:"2px"}}/>
            <div>
              <div className="ns-row-amount">{formatCurrency(d.amount, currency)}</div>
              <div className="ns-row-meta">Matures {formatDate(d.maturityDate)}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="ns-countdown active">{formatRemaining(d.maturityDate)}</div>
            </div>
          </div>
        ))}
      </div>

      {matured.length > 0 && (
        <>
          <div className="ns-section-header">
            <div className="ns-section-title">Ready to Release</div>
          </div>
          <div className="ns-table">
            {matured.map(d => (
              <div
                className="ns-row"
                key={d._id || d.id}
                style={{gridTemplateColumns:"4px 1fr auto"}}
                onClick={() => navigate(`/app/deposits/${d._id || d.id}/release`)}
              >
                <div style={{width:"3px",height:"44px",background:"#1DB954",borderRadius:"2px",opacity:0.8}}/>
                <div>
                  <div className="ns-row-amount">{formatCurrency(d.amount, currency)}</div>
                  <div className="ns-row-meta">Matured {formatDate(d.maturityDate)}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="ns-countdown matured">Ready</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="ns-action-strip">
        <div>
          <div className="ns-action-text">Capital sitting idle is capital leaking.</div>
          <div className="ns-action-text"><em>Lock it. Let time do the work.</em></div>
        </div>
        <button className="ns-action-btn" onClick={() => navigate("/app/deposit")}>+ New Lock</button>
      </div>
    </NomadShell>
  );
}
