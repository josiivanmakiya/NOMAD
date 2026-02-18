import { NavLink } from "react-router-dom";
import LogoLockup from "./LogoLockup.jsx";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `sidebarLink ${isActive ? "sidebarLinkActive" : ""}`;

  const navItems = [
    { to: "/app", label: "Protocol" },
    { to: "/app/deposits", label: "Deposits" },
    { to: "/app/history", label: "Ledger" },
    { to: "/app/vault", label: "Vault" },
    { to: "/app/profile", label: "Profile" },
  ];

  return (
    <aside className="sidebar">
      <LogoLockup size={28} label="NOMAD" className="sidebarBrand" />
      <nav className="sidebarNav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/app"} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="cardMuted monoPanel">
        <p className="label nomadWord">Protocol State</p>
        <p className="hint">Status: ACTIVE</p>
        <p className="hint">Mandate: preserve capital through disciplined time-lock control.</p>
      </div>
    </aside>
  );
}

/**
 * FILE ROLE:
 * Sidebar navigation for the NOMAD app shell.
 *
 * CONNECTS TO:
 * - components/Logo.jsx
 * - react-router NavLink
 *
 * USED BY:
 * - components/AppLayout.jsx
 */


