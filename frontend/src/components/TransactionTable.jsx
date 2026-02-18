export default function TransactionTable({ transactions }) {
  return (
    <div className="card">
      <h2>Transactions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.memo}</td>
              <td>
                {tx.amount} {tx.currency}
              </td>
              <td
                className={
                  tx.status === "locked"
                    ? "balance-locked"
                    : tx.status === "unlocked"
                    ? "balance-available"
                    : "balance-potential"
                }
              >
                {tx.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * FILE ROLE:
 * Renders a simple table for transaction-like lists.
 *
 * CONNECTS TO:
 * - styles.css (table styling)
 *
 * USED BY:
 * - Not currently used in core pages
 */
