import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuthMe } from "../api.js";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("delayUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && parsed.id) {
        return parsed;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  const persistUser = (nextUser) => {
    try {
      localStorage.setItem("delayUser", JSON.stringify(nextUser));
      if (nextUser.id) {
        localStorage.setItem("NOMADUserId", String(nextUser.id));
      }
    } catch {
      // Ignore storage failures in local-only mode.
    }
  };

  const login = (email, name, userId, extra = {}) => {
    const nextUser = {
      id: userId || email || "",
      email,
      name,
      tier: Number(extra.tier || 0),
      phoneNumber: extra.phoneNumber || "",
      userType: extra.userType || "individual",
    };
    persistUser(nextUser);
    setUser(nextUser);
  };

  const logout = () => {
    try {
      localStorage.removeItem("delayUser");
      localStorage.removeItem("NOMADUserId");
    } catch {
      // Ignore storage failures in local-only mode.
    }
    setUser(null);
  };

  useEffect(() => {
    if (!user?.id) return;
    getAuthMe()
      .then((data) => {
        const remoteUser = data.user || {};
        const merged = {
          id: remoteUser.id || user.id,
          email: remoteUser.email || user.email || "",
          name: remoteUser.name || user.name || "",
          tier: Number(remoteUser.tier || 0),
          phoneNumber: remoteUser.phoneNumber || user.phoneNumber || "",
          userType: remoteUser.userType || user.userType || "individual",
        };
        persistUser(merged);
        setUser(merged);
      })
      .catch(() => null);
  }, [user?.id]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * FILE ROLE:
 * Client-side auth state backed by localStorage.
 *
 * CONNECTS TO:
 * - localStorage
 *
 * USED BY:
 * - pages/LoginPage.jsx
 * - pages/SignupPage.jsx
 * - components/Header.jsx
 */
