import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NomadNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem("nomadUser") || localStorage.getItem("delayUser");
      setIsAuthed(Boolean(stored));
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location.pathname]);

  return (
    <nav className="nav nomad-nav">
      <button type="button" className="nav-logo nomad-nav-logo" onClick={() => navigate("/")}>
        <svg
          width="28"
          height="22"
          viewBox="0 0 36 28"
          fill="none"
          aria-hidden="true"
          className="nomad-nav-mark"
        >
          <path d="M13 26L22 6L31 26H13Z" fill="#1a3320"/>
          <path d="M2 26L10 10L18 26H2Z" fill="#2a4d30" opacity="0.85"/>
          <path d="M18 26L25 13L32 26H18Z" fill="#1a3320" opacity="0.6"/>
        </svg>
        Nomad
      </button>

      <ul className="nav-links nomad-nav-links">
        <li><button type="button" className="nav-link nomad-nav-link" onClick={() => navigate("/")}>Landing</button></li>
        <li><button type="button" className="nav-link nomad-nav-link" onClick={() => navigate("/about")}>About</button></li>
        <li><button type="button" className="nav-link nomad-nav-link" onClick={() => navigate("/rules")}>Rules</button></li>
        <li><button type="button" className="nav-link nomad-nav-link" onClick={() => navigate("/calculator")}>Calculator</button></li>
      </ul>

      <div className="nav-right nomad-nav-right">
        <button type="button" className="btn-link nomad-nav-link" onClick={() => navigate("/login")}>Log in</button>
        <button type="button" className="btn btn-primary nomad-nav-cta" onClick={() => navigate("/signup")}>Sign up</button>
      </div>
    </nav>
  );
}
