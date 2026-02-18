import { useState } from "react";
import { Link } from "react-router-dom";
import { previewDeposit, confirmDeposit } from "../api";
import { useDeposit } from "../state/DepositContext.jsx";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";
import { useAccount } from "../state/AccountContext.jsx";
import { TEXT } from "../content/text.js";

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const formatDuration = (ms) => {
  if (!ms) return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

export default function DepositPage() {
  const [amount, setAmount] = useState(1000);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { depositPreview, setDepositPreview, depositResult, setDepositResult } =
    useDeposit();
  const { currency } = useCurrency();
  const { accounts } = useAccount();
  const hasLinkedAccount = accounts.length > 0;

  if (!hasLinkedAccount) {
    return (
      <div className="page">
        <div className="card">
          <p className="label">Account Connection Required</p>
          <p className="hint">
            Connect a funding account to create your first deposit. BVN/NIN can be completed later for full KYC features.
          </p>
          <div className="actions">
            <Link className="primaryLink" to="/app/accounts">
              Connect account
            </Link>
            <Link className="ghostLink" to="/app/home">
              Back to Safe
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePreview = async () => {
    setStatus("");
    if (!selectedAccountId) {
      setStatus("Select an account to fund this deposit.");
      return;
    }
    const data = await previewDeposit(Number(amount));
    setDepositPreview(data.preview);
    setDepositResult(null);
  };

  const handleConfirm = async () => {
    setStatus("");
    if (!selectedAccountId) {
      setStatus("Select an account to fund this deposit.");
      return;
    }
    const data = await confirmDeposit(Number(amount), {
      accountId: selectedAccountId,
      description: description || undefined,
    });
    setDepositResult(data.result);
    setDepositPreview(null);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">{TEXT.DEPOSIT.title}</h2>
          <p className="pageSubtitle">{TEXT.DEPOSIT.subtitle}</p>
        </div>
        <div className="actions">
          <Link className="ghostLink" to="/app/deposits">
            View deposits
          </Link>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          <Card>
            <div className="formSection">
              <p className="sectionTitle">Deposit</p>
              <p className="sectionHint">Funds are time‑locked on arrival.</p>
            </div>

            <div className="formGrid">
              <Field label={TEXT.DEPOSIT.fields.amount}>
                <Input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder={TEXT.DEPOSIT.placeholders.amount}
                />
              </Field>

              <Field label={TEXT.DEPOSIT.fields.account}>
                <Select
                  value={selectedAccountId}
                  onChange={(event) => setSelectedAccountId(event.target.value)}
                >
                  <option value="">{TEXT.DEPOSIT.placeholders.account}</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bankName} •••• {account.last4}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={TEXT.DEPOSIT.fields.description}>
                <Input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder={TEXT.DEPOSIT.placeholders.description}
                />
              </Field>
            </div>

            {status && <InlineStatus message={status} />}

            <ActionRow>
              <Button variant="ghost" onClick={handlePreview}>
                {TEXT.DEPOSIT.actions.preview}
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                {TEXT.DEPOSIT.actions.confirm}
              </Button>
            </ActionRow>
          </Card>

          {depositResult && (
            <Card>
              <SectionTitle>{TEXT.DEPOSIT.confirmed.title}</SectionTitle>
              <p>{TEXT.DEPOSIT.confirmed.body}</p>
              <MonoText>
                {TEXT.DEPOSIT.confirmed.idLabel}: {depositResult?.deposit?._id}
              </MonoText>
            </Card>
          )}
        </div>

        <div className="dashboardStack">
          <Card>
            <div className="formSection">
              <p className="sectionTitle">{TEXT.DEPOSIT.preview.title}</p>
              <p className="sectionHint">Review timing before confirming.</p>
            </div>
            <div className="kvList">
              <InfoRow label={TEXT.DEPOSIT.preview.maturity} value={formatDateTime(depositPreview?.maturesAt)} />
              <InfoRow
                label={TEXT.DEPOSIT.preview.duration}
                value={formatDuration(depositPreview?.lockDurationMs)}
              />
              <InfoRow label={TEXT.DEPOSIT.preview.amount} value={formatCurrency(amount, currency)} />
            </div>
          </Card>

          <Card>
            <p className="label">Funding source</p>
            <p className="hint">
              Deposits can only be funded from linked accounts under your verified name.
            </p>
            <div className="rulesHint">
              <Link className="textLink" to="/app/accounts">
                Manage funding accounts
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Deposit creation page with preview and confirmation steps.
 *
 * CONNECTS TO:
 * - api.js (previewDeposit, confirmDeposit)
 * - state/DepositContext.jsx
 * - state/CurrencyContext.jsx
 * - utils/currency.js
 *
 * USED BY:
 * - src/App.jsx (/app/deposit)
 *
 * NOTES:
 * - Custom duration only allowed for ₦500,000+ deposits.
 */

/**
 * CHANGELOG:
 * - Wired copy to TEXT.DEPOSIT.
 * - Preserved preview and confirm logic.
 */

function PageHeader({ title, subtitle }) {
  return (
    <header>
      <h2 className="textTitle">{title}</h2>
      <p className="hint">{subtitle}</p>
    </header>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Field({ label, children }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function Input(props) {
  return <input className="input" {...props} />;
}

function Select(props) {
  return <select className="input" {...props} />;
}

function ActionRow({ children }) {
  return <div className="actions">{children}</div>;
}

function Button({ children, variant = "ghost", ...props }) {
  const className = variant === "primary" ? "primary" : "ghost";
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

function InlineStatus({ message }) {
  return <p className="status">{message}</p>;
}

function SectionTitle({ children }) {
  return <h3>{children}</h3>;
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function MonoText({ children }) {
  return <p className="mono">{children}</p>;
}
