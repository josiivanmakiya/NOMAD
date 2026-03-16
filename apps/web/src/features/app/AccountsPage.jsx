import { useMemo, useState } from "react";
import { useAccount } from "../../state/AccountContext.jsx";
import AddAccountButton from "../../components/settings/AddAccountButton.jsx";
import BankAccountItem from "../../components/settings/BankAccountItem.jsx";
import ngBanks from "ng-banks";

export default function AccountsPage() {
  const { accounts, cards, addAccount, removeAccount, addCard, removeCard } = useAccount();
  const [accountFormOpen, setAccountFormOpen] = useState(false);
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [status, setStatus] = useState("");
  const bankOptions = useMemo(() => {
    const banks = ngBanks.getBanks?.() || [];
    const extraBanks = [
      { name: "OPay", code: "999" },
      { name: "Moniepoint", code: "998" }
    ];
    const list = banks
      .map((bank) => ({
        label: bank.name,
        value: bank.code,
        name: bank.name
      }))
      .filter((bank) => bank.label && bank.value);
    extraBanks.forEach((bank) => {
      if (!list.some((item) => item.label.toLowerCase() === bank.name.toLowerCase())) {
        list.push({ label: bank.name, value: bank.code, name: bank.name });
      }
    });
    return list.sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const resetAccountForm = () => {
    setAccountName("");
    setAccountBank("");
    setAccountNumber("");
  };

  const resetCardForm = () => {
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
  };

  const handleAddAccount = async (event) => {
    event.preventDefault();
    setStatus("");
    const normalizedNumber = accountNumber.trim().replace(/\s+/g, "");
    if (!accountName.trim() || !accountBank.trim() || normalizedNumber.length !== 10) {
      setStatus("Add a name, bank, and a 10-digit account number.");
      return;
    }
    const selectedBank = bankOptions.find((bank) => bank.value === accountBank.trim());
    const saved = await addAccount({
      name: accountName.trim(),
      bankName: selectedBank?.name || accountBank.trim(),
      bankCode: accountBank.trim(),
      accountNumber: normalizedNumber,
      last4: normalizedNumber.slice(-4),
    });
    if (saved === null) {
      setStatus("Account saved locally. Backend verification unavailable.");
    }
    resetAccountForm();
    setAccountFormOpen(false);
  };

  const handleAddCard = (event) => {
    event.preventDefault();
    setStatus("");
    const normalizedCard = cardNumber.trim().replace(/\s+/g, "");
    if (!cardName.trim() || normalizedCard.length < 12 || !cardExpiry.trim() || !cardCvv.trim()) {
      setStatus("Add the name, card number, expiry, and CVV.");
      return;
    }
    addCard({
      name: cardName.trim(),
      last4: normalizedCard.slice(-4),
      expiry: cardExpiry.trim(),
    });
    resetCardForm();
    setCardFormOpen(false);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle">Accounts</h2>
          <p className="pageSubtitle">Linked funding and withdrawal rails.</p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="dashboardStack">
          <div className="card">
            <p className="label">Bank accounts</p>
            <p className="hint">
              Add the accounts you use to move money in and out of NOMAD. The same
              account can be used for funding and withdrawals.
            </p>
            <div className="settingsList">
              <AddAccountButton
                label={accountFormOpen ? "Close form" : "Add account"}
                onClick={() => {
                  setStatus("");
                  setAccountFormOpen((prev) => !prev);
                }}
              />
              {accountFormOpen ? (
                <form className="authForm" onSubmit={handleAddAccount}>
                  <div className="field">
                    <label>Account name</label>
                    <input
                      className="input"
                      value={accountName}
                      onChange={(event) => setAccountName(event.target.value)}
                      placeholder="Name on the account"
                    />
                  </div>
                  <div className="field">
                    <label>Bank</label>
                    <select
                      className="input"
                      value={accountBank}
                      onChange={(event) => setAccountBank(event.target.value)}
                    >
                      <option value="">Select bank</option>
                      {bankOptions.map((bank) => (
                        <option key={bank.value} value={bank.value}>
                          {bank.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Account number</label>
                    <input
                      className="input"
                      value={accountNumber}
                      onChange={(event) => setAccountNumber(event.target.value)}
                      placeholder="10-digit account number"
                      inputMode="numeric"
                      maxLength={10}
                    />
                  </div>
                  <p className="hint">Names must match your profile.</p>
                  <div className="actions">
                    <button className="primary" type="submit">
                      Save account
                    </button>
                  </div>
                </form>
              ) : null}
              {accounts.length === 0 ? (
                <p className="hint">No accounts yet.</p>
              ) : (
                accounts.map((account) => (
                  <BankAccountItem
                    key={`account-${account.id}`}
                    bank={account.bankName}
                    masked={`•••• ${account.last4} · ${account.name || "Account holder"}`}
                    onRemove={() => removeAccount(account.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="dashboardStack">
          <div className="card">
            <p className="label">Debit cards</p>
            <p className="hint">
              Add cards for faster deposits and easy tracking.
            </p>
            <div className="settingsList">
              <AddAccountButton
                label={cardFormOpen ? "Close form" : "Add card"}
                onClick={() => {
                  setStatus("");
                  setCardFormOpen((prev) => !prev);
                }}
              />
              {cardFormOpen ? (
                <form className="authForm" onSubmit={handleAddCard}>
                  <div className="field">
                    <label>Name on card</label>
                    <input
                      className="input"
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      placeholder="Cardholder name"
                    />
                  </div>
                  <div className="field">
                    <label>Card number</label>
                    <input
                      className="input"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      inputMode="numeric"
                      maxLength={19}
                    />
                  </div>
                  <div className="field">
                    <label>Expiry</label>
                    <input
                      className="input"
                      value={cardExpiry}
                      onChange={(event) => setCardExpiry(event.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="field">
                    <label>CVV</label>
                    <input
                      className="input"
                      value={cardCvv}
                      onChange={(event) => setCardCvv(event.target.value)}
                      placeholder="123"
                      inputMode="numeric"
                      maxLength={4}
                    />
                  </div>
                  <div className="actions">
                    <button className="primary" type="submit">
                      Save card
                    </button>
                  </div>
                </form>
              ) : null}
              {cards.length === 0 ? (
                <p className="hint">No cards yet.</p>
              ) : (
                cards.map((card) => (
                  <div key={`card-${card.id}`} className="bankItem">
                    <div>
                      <p className="settingsItemTitle">{card.name || "Debit card"}</p>
                      <p className="hint">•••• {card.last4 || "0000"}</p>
                    </div>
                    <button className="ghost" type="button" onClick={() => removeCard(card.id)}>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            {status && <p className="status">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Accounts page for funding and withdrawal rails.
 *
 * CONNECTS TO:
 * - state/AccountContext.jsx
 *
 * USED BY:
 * - src/App.jsx (/app/accounts)
 */

/**
 * CHANGELOG:
 * - Replaced editable form with minimal lists.
 */

