import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useCurrency } from "../state/CurrencyContext.jsx";

export default function Header() {
  const { logout } = useAuth();
  const { currency } = useCurrency();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="appHeader">
      <div>
        <p className="appHeaderMeta">SYSTEM STATUS</p>
        <h1 className="appHeaderTitle">Protocol Active · Currency {currency}</h1>
      </div>
      <div className="appHeaderActions">
        <button className="ghost" onClick={handleLogout}>
          Exit Session
        </button>
      </div>
    </header>
  );
}

/**
 * FILE ROLE:
 * Top navigation bar for authenticated sections.
 *
 * CONNECTS TO:
 * - state/AuthContext.jsx (logout)
 *
 * USED BY:
 * - components/AppLayout.jsx
 */
