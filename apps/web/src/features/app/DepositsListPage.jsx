import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeposits } from "../../api";
import { formatCurrency } from "../../utils/currency.js";
import { useCurrency } from "../../state/CurrencyContext.jsx";
import NomadShell from "../../components/NomadShell.jsx";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
};

const getStateBadge = (state) => {
  const s = String(state || "").toLowerCase();
  if (s === "locked") return { label: "Locked", cls: "locked" };
  if (s === "matured" || s === "release_ready") return { label: "Matured", cls: "matured" };
  if (s === "released") return { label: "Released", cls: "released" };
  return { label: s, cls: "released" };
};

export default function DepositsListPage() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const pageSize = 8;

  useEffect(() => {
    getDeposits()
      .then(data => setDeposits(data?.deposits || data || []))
      .catch(() => setDeposits([]))
      .finally(() => setLoading(false));
  }, []);

  const total = deposits.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = deposits.slice((page - 1) * pageSize, page * pageSize);
  const totalAmount = deposits.reduce((sum, d) => sum + (d.amount || 0), 0);
  const lockedCount = deposits.filter(d => String(d.state || "").toLowerCase() === "locked").length;
  const maturedCount = deposits.filter(d => ["matured","release_ready"].includes(String(d.state || "").toLowerCase())).length;

  return (
    <NomadShell
      title="DEPOSITS"
      sub={`${total} total deposits`}
      action={{ label: "+ New Deposit", onClick: () => navigate("/app/deposit") }}
    >
      <div className="ns-stat-grid">
        <div className="ns-stat">
          <div className="ns-stat-label">Total Deposited</div>
          <div className="ns-stat-val white">{formatCurrency(totalAmount, currency)}</div>
          <div className="ns-stat-sub">All deposits combined</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Currently Locked</div>
          <div className="ns-stat-val white">{lockedCount}</div>
          <div className="ns-stat-sub">Under active time lock</div>
        </div>
        <div className="ns-stat">
          <div className="ns-stat-label">Ready to Act</div>
          <div className="ns-stat-val green">{maturedCount}</div>
          <div className="ns-stat-sub">Matured — release or relock</div>
        </div>
      </div>

      <div className="ns-section-header">
        <div className="ns-section-title">All Deposits</div>
        <span style={{fontSize:"9px",color:"var(--mid)",letterSpacing:"2px",fontWeight:700}}>
          Page {page} of {Math.max(1, totalPages)}
        </span>
      </div>
      <div className="ns-table">
        {loading ? (
          <div className="ns-empty">Loading deposits...</div>
        ) : paginated.length === 0 ? (
          <div className="ns-empty">No deposits yet — start when you're ready</div>
        ) : paginated.map(d => {
          const badge = getStateBadge(d.state);
          return (
            <div
              className="ns-row"
              key={d._id || d.id}
              style={{gridTemplateColumns:"1fr auto"}}
              onClick={() => navigate(`/app/deposits/${d._id || d.id}`)}
            >
              <div>
                <div className="ns-row-amount">{formatCurrency(d.amount, currency)}</div>
                <div className="ns-row-meta">
                  {formatDate(d.createdAt)} · Ref: {d.fundingReference || "—"}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className={`ns-badge ${badge.cls}`}>{badge.label}</div>
                <div style={{fontSize:"9px",color:"var(--mid)",marginTop:"6px",letterSpacing:"1px"}}>
                  Matures {formatDate(d.maturityDate)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div style={{display:"flex",gap:"8px",marginBottom:"32px"}}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{padding:"8px 20px",background:"none",border:"1px solid var(--border)",color:"var(--mid)",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:800,opacity:page===1?0.3:1}}
          >← Prev</button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{padding:"8px 20px",background:"none",border:"1px solid var(--border)",color:"var(--mid)",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:800,opacity:page===totalPages?0.3:1}}
          >Next →</button>
        </div>
      )}

      <div className="ns-action-strip">
        <div>
          <div className="ns-action-text">Automate your capital building.</div>
          <div className="ns-action-text"><em>Set a recurring deposit — once, then forget.</em></div>
        </div>
        <button className="ns-action-btn" onClick={() => navigate("/app/protocols")}>Set Recurring →</button>
      </div>
    </NomadShell>
  );
}
