import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { BYPASS_APP_AUTH_GUARD } from "../config/featureFlags.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (BYPASS_APP_AUTH_GUARD) {
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/genesis" replace state={{ from: location }} />;
  }

  return children;
}

/**
 * FILE ROLE:
 * Route guard wrapper for authenticated app paths.
 */
