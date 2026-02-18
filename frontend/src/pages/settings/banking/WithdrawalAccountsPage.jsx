import { Link } from "react-router-dom";
import { settingsCopy } from "../../../content/settingsCopy.js";

export default function WithdrawalAccountsPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.banking.withdrawal.title}</p>
        <p className="hint">{settingsCopy.banking.withdrawal.description}</p>
        <div className="actions">
          <Link className="primaryLink" to="/app/accounts">
            Manage accounts
          </Link>
        </div>
      </div>
    </div>
  );
}
