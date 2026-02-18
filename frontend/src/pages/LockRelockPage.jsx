import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeposits } from "../api";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";

export default function LockRelockPage() {
  const { lockId } = useParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [source, setSource] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getDeposits()
      .then((data) => {
        const found = (data.deposits || []).find((item) => item._id === lockId);
        setSource(
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

  const numericAmount = source?.amount ? Number(source.amount) : 0;

  if (!source) {
    return (
      <div className="page">
        <div className="card">
          <p className="hint">{status || "Lock not found."}</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/app/deposits/${lockId}/relock`);
  };

  return (
    <div className="page">
      <h2 className="textTitle">Relock</h2>
      <p className="hint">This starts a new timer.</p>

      <div className="card">
        <p className="label">Relock amount</p>
        <p className="amount">{formatCurrency(numericAmount, currency)}</p>
        <p className="hint">Relock uses deposit flow and backend timer rules.</p>
        <div className="actions">
          <button className="primary" type="button" onClick={handleSubmit}>
            Continue to relock
          </button>
          <button className="ghost" type="button" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Create a new lock from matured funds.
 */
