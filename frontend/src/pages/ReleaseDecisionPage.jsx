import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { previewRelease, confirmRelease, previewUnlock, confirmUnlock, getDeposits } from "../api";
import { useAccount } from "../state/AccountContext.jsx";
import { formatCurrency } from "../utils/currency.js";
import { useCurrency } from "../state/CurrencyContext.jsx";
import { TEXT } from "../content/text.js";
import ngBanks from "ng-banks";

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

export default function ReleaseDecisionPage() {
  const { depositId } = useParams();
  const { accounts, selectedAccountId, setSelectedAccountId } = useAccount();
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId);
  const [deposit, setDeposit] = useState(null);
  const [mode, setMode] = useState("single");
  const [useEmergency, setUseEmergency] = useState(false);
  const [preview, setPreview] = useState(null);
  const [unlockPreview, setUnlockPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const { currency } = useCurrency();

  useEffect(() => {
    getDeposits()
      .then((data) => {
        const found = (data.deposits || []).find((item) => item._id === depositId);
        setDeposit(found || null);
      })
      .catch(() => null);
  }, [depositId]);

  useEffect(() => {
    if (!deposit) return;
    setStatus("");
    if (deposit.state === "MATURED") {
      previewRelease(depositId)
        .then((data) => setPreview(data.preview))
        .catch((error) => setStatus(error.message));
      return;
    }

    previewUnlock({ mode, depositId, useEmergency })
      .then((data) => setUnlockPreview(data.preview))
      .catch((error) => setStatus(error.message));
  }, [deposit, depositId, mode, useEmergency]);

  const bankOptions = useMemo(
    () =>
      (() => {
        const banks = (ngBanks.getBanks?.() || []).map((bank) => ({
          label: bank.name,
          value: bank.code,
        }));
        const extraBanks = [
          { label: "OPay", value: "999" },
          { label: "Moniepoint", value: "998" }
        ];
        extraBanks.forEach((bank) => {
          if (!banks.some((item) => item.label?.toLowerCase() === bank.label.toLowerCase())) {
            banks.push(bank);
          }
        });
        return banks
          .filter((bank) => bank.label && bank.value)
          .sort((a, b) => a.label.localeCompare(b.label));
      })(),
    []
  );

  const handleConfirm = async () => {
    setStatus("");
    const recipient = {
      name: accountName || selectedAccount?.bankName || "NOMAD user",
      account_number: accountNumber,
      bank_code: selectedBank,
    };

    if (!recipient.account_number || !recipient.bank_code) {
      setStatus("Bank account number and bank are required.");
      return;
    }

    if (deposit?.state === "MATURED") {
      // TODO: Integrate Paystack test API to simulate release
      const data = await confirmRelease(depositId, recipient);
      setResult(data.result);
      return;
    }

    const data = await confirmUnlock({
      mode,
      depositId,
      useEmergency,
      recipient,
    });
    setResult(data.result);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">{TEXT.RELEASE.title}</h2>
          <p className="pageSubtitle">{TEXT.RELEASE.subtitle}</p>
        </div>
        <div className="actions">
          <Link className="ghostLink" to="/app/deposits">
            Back to deposits
          </Link>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          {!deposit ? (
            <Card>
              <p className="hint">{TEXT.RELEASE.loading}</p>
            </Card>
          ) : (
            <Card>
              {deposit?.state === "MATURED" ? (
                <>
                  <InfoRow label={TEXT.RELEASE.summary.maturity} value={formatDateTime(preview?.maturesAt)} />
                  <InfoRow label={TEXT.RELEASE.summary.penalty} value={formatCurrency(0, currency)} />
                  <InfoRow label={TEXT.RELEASE.summary.net} value={formatCurrency(preview?.netAmount, currency)} />
                </>
              ) : (
                <>
                  <InfoRow
                    label={TEXT.RELEASE.summary.mode}
                    value={mode === "all" ? TEXT.RELEASE.modes.all : TEXT.RELEASE.modes.single}
                  />
                  <InfoRow
                    label={TEXT.RELEASE.summary.fee}
                    value={formatCurrency(unlockPreview?.feeAmount || unlockPreview?.totals?.feeTotal, currency)}
                  />
                  <InfoRow
                    label={TEXT.RELEASE.summary.net}
                    value={formatCurrency(unlockPreview?.netAmount || unlockPreview?.totals?.netTotal, currency)}
                  />
                  <InfoRow
                    label={TEXT.RELEASE.summary.timersReset}
                    value={mode === "single" ? `${unlockPreview?.resetCount || 0} deposit(s)` : "No resets in unlock-all"}
                  />
                  <InfoRow
                    label={TEXT.RELEASE.summary.emergencyRemaining}
                    value={`${unlockPreview?.emergencyRemaining ?? 0} left`}
                  />
                </>
              )}

              <Field label={TEXT.RELEASE.fields.destination}>
                <Select
                  value={selectedAccountId || ""}
                  onChange={(event) => setSelectedAccountId(event.target.value)}
                >
                  <option value="">{TEXT.RELEASE.placeholders.account}</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bankName} •••• {account.last4}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={TEXT.RELEASE.fields.bank}>
                <Select
                  value={selectedBank}
                  onChange={(event) => setSelectedBank(event.target.value)}
                >
                  <option value="">{TEXT.RELEASE.placeholders.bank}</option>
                  {bankOptions.map((bank) => (
                    <option key={bank.value} value={bank.value}>
                      {bank.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={TEXT.RELEASE.fields.accountName}>
                <Input
                  value={accountName}
                  onChange={(event) => setAccountName(event.target.value)}
                  placeholder={TEXT.RELEASE.placeholders.name}
                />
              </Field>

              <Field label={TEXT.RELEASE.fields.accountNumber}>
                <Input
                  value={accountNumber}
                  onChange={(event) => setAccountNumber(event.target.value)}
                  placeholder={TEXT.RELEASE.placeholders.number}
                />
              </Field>

              {deposit?.state !== "MATURED" && (
                <Field label={TEXT.RELEASE.fields.mode}>
                  <Select value={mode} onChange={(event) => setMode(event.target.value)}>
                    <option value="single">{TEXT.RELEASE.modes.single}</option>
                    <option value="all">{TEXT.RELEASE.modes.all}</option>
                  </Select>
                </Field>
              )}

              {deposit?.state !== "MATURED" && (
                <Field label={TEXT.RELEASE.emergency.label}>
                  <Select
                    value={useEmergency ? "yes" : "no"}
                    onChange={(event) => setUseEmergency(event.target.value === "yes")}
                  >
                    <option value="no">{TEXT.RELEASE.emergency.no}</option>
                    <option value="yes">{TEXT.RELEASE.emergency.yes}</option>
                  </Select>
                </Field>
              )}

              {status && <InlineStatus message={status} />}

              <Button variant="primary" onClick={handleConfirm}>
                {TEXT.RELEASE.actions.confirm}
              </Button>
            </Card>
          )}
        </div>

        <div className="dashboardStack">
          <Card>
            <p className="label">Summary</p>
            <p className="hint">
              Review fees and reset rules before confirming.
            </p>
          </Card>

          {result && (
            <Card>
              <SectionTitle>{TEXT.RELEASE.complete.title}</SectionTitle>
              <p className="amount">
                {formatCurrency(result?.release?.netAmount, currency)}
              </p>
            </Card>
          )}
        </div>
      </div>

      {result && (
        <Card>
          <SectionTitle>{TEXT.RELEASE.complete.title}</SectionTitle>
          <p className="amount">
            {formatCurrency(result?.release?.netAmount, currency)}
          </p>
        </Card>
      )}
    </div>
  );
}

/**
 * FILE ROLE:
 * Release decision page for matured releases and early unlock modes.
 *
 * CONNECTS TO:
 * - api.js (previewRelease, confirmRelease, previewUnlock, confirmUnlock, getDeposits)
 * - state/AccountContext.jsx
 * - state/CurrencyContext.jsx
 * - utils/currency.js
 *
 * USED BY:
 * - src/App.jsx (/app/deposits/:depositId/release)
 *
 * NOTES:
 * - Shows consequences before confirmation (fees, resets, emergencies).
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

function Select(props) {
  return <select className="input" {...props} />;
}

function Input(props) {
  return <input className="input" {...props} />;
}

/**
 * CHANGELOG:
 * - Wired all copy to TEXT.RELEASE.
 */

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

