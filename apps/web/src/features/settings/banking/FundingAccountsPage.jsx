import { Link } from "react-router-dom";
import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function FundingAccountsPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.banking.funding.title}</p>
        <p className="hint">{settingsCopy.banking.funding.description}</p>
        <div className="actions">
          <Link className="primaryLink" to="/app/accounts">
            Manage accounts
          </Link>
        </div>
      </div>
    </div>
  );
}

