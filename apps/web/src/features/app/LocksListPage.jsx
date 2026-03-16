import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getDeposits } from "../../api";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import NomadShell from "../../components/NomadShell.jsx";

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
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h`;
  return "Ready";
};

const getState = (deposit) => {
  const s = String(deposit?.state || "").toLowerCase();
  if (s === "locked") return "active";
  if (s === "matured" || s === "release_ready") return "matured";
  return s;
};

export default function LocksListPage() {
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

  const locked = useMemo(() => deposits.filter(d => getState(d) === "active"), [deposits]);
  const matured = useMemo(() => deposits.filter(d => getState(d) === "matured"), [deposits]);
  const totalLocked = useMemo(() => locked.reduce((sum, d) => sum + (d.amount || 0), 0), [locked]);

  return (
    <NomadShell
      title="LOCKS"
      sub={`${locked.length} active · ${matured.length} matured`}
      action={{ label: "+ New Lock", onClick: () => navigate("/app/deposit") }}
    >
      <div className="ns-stat-grid">
        <div className="ns-stat">
          <div className="ns-stat-label">Locked Capital</div>
          <div className="ns-stat-val white">{formatCurrency(totalLocked, currency)}</div>
          <div className="ns-stat-sub">{locked.length} active locks</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Matured</div>
          <div className="ns-stat-val green">{matured.length}</div>
          <div className="ns-stat-sub">Ready to release or relock</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Total Locks</div>
          <div className="ns-stat-val white">{deposits.length}</div>
          <div className="ns-stat-sub">All time</div>
        </div>
      </div>

      <div className="ns-section-header">
        <div className="ns-section-title">Active</div>
      </div>
      <div className="ns-table">
        {loading ? (
          <div className="ns-empty">Loading locks...</div>
        ) : locked.length === 0 ? (
          <div className="ns-empty">No active locks</div>
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
              <div className="ns-row-meta">
                Locked {formatDate(d.createdAt)} · Matures {formatDate(d.maturityDate)}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="ns-countdown active">{formatRemaining(d.maturityDate)}</div>
              <div className="ns-badge active" style={{marginTop:"4px",display:"inline-block"}}>Active</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ns-section-header">
        <div className="ns-section-title">Matured — Ready to Act</div>
      </div>
      <div className="ns-table">
        {matured.length === 0 ? (
          <div className="ns-empty">No matured locks</div>
        ) : matured.map(d => (
          <div
            className="ns-row"
            key={d._id || d.id}
            style={{gridTemplateColumns:"4px 1fr auto"}}
            onClick={() => navigate(`/app/deposits/${d._id || d.id}/release`)}
          >
            <div style={{width:"3px",height:"44px",background:"#1DB954",borderRadius:"2px",opacity:0.8}}/>
            <div>
              <div className="ns-row-amount">{formatCurrency(d.amount, currency)}</div>
              <div className="ns-row-meta">
                Locked {formatDate(d.createdAt)} · Matured {formatDate(d.maturityDate)}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="ns-countdown matured">Ready</div>
              <div className="ns-badge matured" style={{marginTop:"4px",display:"inline-block"}}>Matured</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ns-action-strip">
        <div>
          <div className="ns-action-text">Lock more capital.</div>
          <div className="ns-action-text"><em>Every lock builds your discipline score.</em></div>
        </div>
        <button className="ns-action-btn" onClick={() => navigate("/app/deposit")}>+ New Lock</button>
      </div>
    </NomadShell>
  );
}
