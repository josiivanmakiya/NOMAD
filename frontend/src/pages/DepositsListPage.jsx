import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDeposits } from "../api";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";
import { TEXT } from "../content/text.js";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
};

export default function DepositsListPage() {
  const [deposits, setDeposits] = useState([]);
  const [page, setPage] = useState(1);
  const { currency } = useCurrency();
  const pageSize = 6;

  useEffect(() => {
    getDeposits()
      .then((data) => setDeposits(data.deposits || []))
      .catch(() => null);
  }, []);

  const totalPages = Math.max(Math.ceil(deposits.length / pageSize), 1);
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedDeposits = deposits.slice(startIndex, startIndex + pageSize);
  const recurringNudge =
    deposits.length <= 0
      ? "After your first deposit, Nomad can automate recurring deductions safely."
      : deposits.length === 1
        ? "First deposit done. You can now automate recurring deductions by amount and schedule."
        : deposits.length === 2
          ? "Second deposit done. Set recurring deposits to remove manual decisions."
          : "Third+ deposit detected. Activate recurring deposits to keep your protocol consistent.";

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">{TEXT.DEPOSITS.title}</h2>
          <p className="pageSubtitle">{TEXT.DEPOSITS.subtitle}</p>
        </div>
        <div className="actions">
          <Link className="primaryLink" to="/app/deposit">
            Make a deposit
          </Link>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="modeGroup">
          <p className="modeGroupTitle">Read-Only</p>
          <div className="list">
            {deposits.length === 0 && (
              <p className="hint">
                {TEXT.DEPOSITS.empty.body}
              </p>
            )}
            {pagedDeposits.map((deposit) => (
              <Link key={deposit._id} className="listItem" to={`/app/deposits/${deposit._id}`}>
                <div>
                  <p className="label">{TEXT.DEPOSITS.columns.amount}</p>
                  <p className="amount">
                    {formatCurrency(deposit.amount, currency)}
                  </p>
                </div>
                <div>
                  <p className="label">{TEXT.DEPOSITS.columns.status}</p>
                  <p className={`badge badge-${deposit.state?.toLowerCase()}`}>
                    {deposit.state}
                  </p>
                </div>
                <div>
                  <p className="label">{TEXT.DEPOSITS.columns.matures}</p>
                  <p>{formatDate(deposit.lock?.maturesAt)}</p>
                </div>
              </Link>
            ))}
          </div>

          {deposits.length > pageSize && (
            <div className="pagination">
              <button
                className="paginationButton"
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                {TEXT.DEPOSITS.pagination.previous}
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    className={`paginationButton ${pageNumber === currentPage ? "paginationButtonActive" : ""}`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className="paginationButton"
                disabled={currentPage === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              >
                {TEXT.DEPOSITS.pagination.next}
              </button>
            </div>
          )}
        </div>

        <div className="modeGroup">
          <p className="modeGroupTitle">Actions</p>
          <div className="card readOnlySurface">
            <p className="label">Summary</p>
            <p className="hint">
              {deposits.length} total deposits · Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="card actionSurface">
            <p className="label">Recurring protocol</p>
            <p className="hint">{recurringNudge}</p>
            <p className="hint">
              Safe mode: verified account, tokenized authorization, server-side idempotent commands.
            </p>
            <div className="actions">
              <Link className="primaryLink" to="/app/protocols">
                Set recurring deposits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Lists all deposits with status and maturity.
 *
 * CONNECTS TO:
 * - api.js (getDeposits)
 * - utils/currency.js
 * - state/CurrencyContext.jsx
 *
 * USED BY:
 * - src/App.jsx (/app/deposits)
 */

/**
 * CHANGELOG:
 * - Wired all copy to TEXT.DEPOSITS.
 */
