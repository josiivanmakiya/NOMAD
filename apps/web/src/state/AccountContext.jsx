import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listLinkedAccounts, linkLinkedAccount, deleteLinkedAccount } from "../api.js";

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let mounted = true;
    const loadAccounts = async () => {
      try {
        const data = await listLinkedAccounts();
        if (!mounted) return;
        setAccounts((data.accounts || []).map((account) => ({
          id: account._id,
          name: account.accountName || account.name,
          bankName: account.bankName,
          bankCode: account.bankCode,
          accountNumber: account.accountNumber,
          last4: account.last4 || account.accountNumber?.slice(-4),
        })));
      } catch (error) {
        // Keep local state if backend is unavailable.
      }
    };
    loadAccounts();
    return () => {
      mounted = false;
    };
  }, []);

  const addAccount = async (account) => {
    const data = await linkLinkedAccount({
      bankCode: account.bankCode,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountName: account.name,
    });
    const linked = data.account;
    const saved = {
      id: linked._id,
      name: linked.accountName,
      bankName: linked.bankName,
      bankCode: linked.bankCode,
      accountNumber: linked.accountNumber,
      last4: linked.last4 || linked.accountNumber?.slice(-4),
    };
    setAccounts((prev) => [...prev, saved]);
    return saved;
  };

  const removeAccount = async (accountId) => {
    await deleteLinkedAccount(accountId);
    setAccounts((prev) => prev.filter((account) => account.id !== accountId));
    if (selectedAccountId === accountId) {
      setSelectedAccountId(null);
    }
  };

  const addCard = (card) => {
    setCards((prev) => [...prev, { ...card, id: crypto.randomUUID() }]);
  };

  const removeCard = (cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const value = useMemo(
    () => ({
      accounts,
      cards,
      selectedAccountId,
      addAccount,
      removeAccount,
      addCard,
      removeCard,
      setSelectedAccountId
    }),
    [accounts, cards, selectedAccountId]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  return useContext(AccountContext);
}

/**
 * FILE ROLE:
 * Client-side account and card state for release destinations.
 *
 * CONNECTS TO:
 * - local state only (no backend yet)
 *
 * USED BY:
 * - pages/ProfilePage.jsx
 * - pages/AccountsPage.jsx
 * - pages/ReleaseDecisionPage.jsx
 */
