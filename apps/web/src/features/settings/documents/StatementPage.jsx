import { settingsCopy } from "../../../../content/settingsCopy.js";

export default function StatementPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">{settingsCopy.documents.statement.title}</p>
        <p className="hint">{settingsCopy.documents.statement.description}</p>
        <div className="actions">
          <button className="primary" type="button">
            Download statement
          </button>
          <button className="ghost" type="button">
            Email statement
          </button>
        </div>
      </div>
    </div>
  );
}

