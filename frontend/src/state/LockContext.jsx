import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LockContext = createContext(null);

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getLockDurationDays = (amount) => {
  if (amount <= 5000) return 1;
  if (amount <= 15000) return 3;
  if (amount <= 30000) return 5;
  if (amount <= 50000) return 7;
  if (amount <= 100000) return 14;
  if (amount <= 250000) return 21;
  if (amount <= 500000) return 30;
  if (amount <= 999999) return 60;
  return 90;
};

const loadLocks = () => {
  try {
    const raw = localStorage.getItem("delay.locks");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocks = (locks) => {
  localStorage.setItem("delay.locks", JSON.stringify(locks));
};

const computeBalances = (locks) => {
  const potentialBalance = locks.reduce((sum, lock) => sum + lock.amount, 0);
  const availableBalance = locks
    .filter((lock) => lock.status === "matured")
    .reduce((sum, lock) => sum + lock.amount, 0);
  return { potentialBalance, availableBalance };
};

const getTotalLockedAmount = (locks) =>
  locks.filter((lock) => lock.status === "locked").reduce((sum, lock) => sum + lock.amount, 0);

const updateStatuses = (locks) => {
  const now = Date.now();
  return locks.map((lock) => {
    if (lock.status === "locked" && now >= lock.maturityTime) {
      return { ...lock, status: "matured" };
    }
    return lock;
  });
};

const resetActiveLocks = (locks, totalLockedAmount) => {
  if (totalLockedAmount <= 0) return locks;
  const lockDurationDays = getLockDurationDays(totalLockedAmount);
  const startTime = Date.now();
  const maturityTime = startTime + lockDurationDays * ONE_DAY_MS;

  return locks.map((lock) => {
    if (lock.status !== "locked") return lock;
    return {
      ...lock,
      lockDurationDays,
      startTime,
      maturityTime,
    };
  });
};

export function LockProvider({ children }) {
  const [locks, setLocks] = useState(() => loadLocks());

  useEffect(() => {
    setLocks((prev) => updateStatuses(prev));
    const timer = setInterval(() => {
      setLocks((prev) => updateStatuses(prev));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveLocks(locks);
  }, [locks]);

  const createLock = (amount) => {
    const startTime = Date.now();
    const newLock = {
      id: crypto.randomUUID(),
      amount,
      lockDurationDays: 0,
      startTime,
      maturityTime: startTime,
      status: "locked",
    };

    setLocks((prev) => {
      const next = [newLock, ...prev];
      const totalLockedAmount = getTotalLockedAmount(next);
      return resetActiveLocks(next, totalLockedAmount);
    });
    return newLock;
  };

  const breachLock = (lockId) => {
    setLocks((prev) => {
      const next = prev.map((lock) => {
        if (lock.id !== lockId || lock.status !== "locked") return lock;
        const penaltyPercent = Math.random() * (5 - 3) + 3;
        const penaltyAmount = (lock.amount * penaltyPercent) / 100;
        return {
          ...lock,
          amount: Math.max(0, lock.amount - penaltyAmount),
          status: "breached",
          penaltyPercent: Number(penaltyPercent.toFixed(2)),
        };
      });
      const totalLockedAmount = getTotalLockedAmount(next);
      return resetActiveLocks(next, totalLockedAmount);
    });
  };

  const relock = (amount) => createLock(amount);

  const balances = useMemo(() => computeBalances(locks), [locks]);

  const value = useMemo(
    () => ({
      locks,
      balances,
      createLock,
      breachLock,
      relock,
      getLockDurationDays,
    }),
    [locks, balances]
  );

  return <LockContext.Provider value={value}>{children}</LockContext.Provider>;
}

export function useLocks() {
  return useContext(LockContext);
}

export const formatRemaining = (maturityTime) => {
  const now = Date.now();
  const diff = Math.max(0, maturityTime - now);
  const days = Math.floor(diff / ONE_DAY_MS);
  const hours = Math.floor((diff % ONE_DAY_MS) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

/**
 * FILE ROLE:
 * Local lock store for the nomad flow (frontend-only).
 */
