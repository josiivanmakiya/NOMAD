import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import DevSessionBanner from "./DevSessionBanner.jsx";

export default function AppLayout() {
  const footerLinks = [
    { label: "Protocol", to: "/app" },
    { label: "Deposits", to: "/app/deposits" },
    { label: "Ledger", to: "/app/history" },
    { label: "Vault", to: "/app/vault" },
    { label: "Profile", to: "/app/profile" },
  ];

  return (
    <div className="appShell">
      <Sidebar />
      <div className="contentShell">
        <Header />
        <DevSessionBanner />
        <main className="appMain">
          <Outlet />
        </main>
        <nav className="bottomNav">
          <NavLink to="/app" end className={({ isActive }) => `bottomNavLink ${isActive ? "active" : ""}`}>PROTOCOL</NavLink>
          <NavLink to="/app/deposits" className={({ isActive }) => `bottomNavLink ${isActive ? "active" : ""}`}>DEPOSITS</NavLink>
          <NavLink to="/app/history" className={({ isActive }) => `bottomNavLink ${isActive ? "active" : ""}`}>LEDGER</NavLink>
          <NavLink to="/app/vault" className={({ isActive }) => `bottomNavLink ${isActive ? "active" : ""}`}>VAULT</NavLink>
          <NavLink to="/app/profile" className={({ isActive }) => `bottomNavLink ${isActive ? "active" : ""}`}>PROFILE</NavLink>
        </nav>
        <footer className="appFooter">
          <div className="footerGrid">
            <div>
              <p className="footerTitle nomadWord">NOMAD</p>
              <p className="hint">Capital preservation infrastructure for disciplined operators.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="footerNavList">
                {footerLinks.map((item) =>
                  item.to ? (
                    <Link key={item.label} className="footerLink" to={item.to}>
                      {item.label}
                    </Link>
                  ) : (
                    <a key={item.label} className="footerLink" href={item.href}>
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="footerTitle">Support Channel</p>
              <span className="footerLink">help@nomad.app</span>
              <span className="footerLink">Terms and legal (in preparation)</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Shared layout for authenticated pages (header, content, footer).
 *
 * CONNECTS TO:
 * - components/Header.jsx
 *
 * USED BY:
 * - src/App.jsx (nested routes under /app)
 */


