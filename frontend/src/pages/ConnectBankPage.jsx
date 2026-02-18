import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_FLOW_COPY } from "../content/authFlowCopy.js";
import ngBanks from "ng-banks";
import { linkLinkedAccount } from "../api.js";
import { useAuth } from "../state/AuthContext.jsx";

export default function ConnectBankPage() {
  const { funding } = AUTH_FLOW_COPY;
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const bankOptions = useMemo(() => {
    const banks = ngBanks.getBanks?.() || [];
    const extraBanks = [
      { name: "OPay", code: "999" },
      { name: "Moniepoint", code: "998" },
    ];
    const list = banks
      .map((bank) => ({ name: bank.name, code: bank.code }))
      .filter((bank) => bank.name && bank.code);
    extraBanks.forEach((bank) => {
      if (!list.some((item) => item.name.toLowerCase() === bank.name.toLowerCase())) {
        list.push(bank);
      }
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedNumber = accountNumber.replace(/\D/g, "");
    if (!selectedBank || normalizedNumber.length !== 10) {
      setStatus("Select bank and enter a valid 10-digit account number.");
      return;
    }
    setStatus("");
    setLoading(true);
    try {
      const bank = bankOptions.find((item) => item.code === selectedBank);
      await linkLinkedAccount({
        bankCode: selectedBank,
        bankName: bank?.name || "Bank",
        accountNumber: normalizedNumber,
        accountName: accountName.trim() || user?.name || "Nomad User",
      });
      navigate("/app/home");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">{funding.title}</h2>
        <p className="hint">{funding.body}</p>
        <form onSubmit={handleSubmit} className="authForm">
          <label>{funding.fieldLabel}</label>
          <select
            className="input"
            value={selectedBank}
            onChange={(event) => setSelectedBank(event.target.value)}
          >
            <option value="">Select bank</option>
            {bankOptions.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
          <label>Account number</label>
          <input
            className="input"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
            placeholder="10-digit NUBAN"
          />
          <label>Account name</label>
          <input
            className="input"
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
            placeholder="Name on account"
          />
          <p className="hint">{funding.info}</p>
          {status ? <p className="status">{status}</p> : null}
          <button className="primary" type="submit" disabled={!selectedBank || loading}>
            {funding.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Connect a funding account prior to vault access.
 *
 * CONNECTS TO:
 * - content/authFlowCopy.js
 *
 * USED BY:
 * - src/App.jsx (/connect-bank)
 */
