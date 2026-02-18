import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import Logo from "../components/Logo.jsx";
import { TEXT } from "../content/text.js";
import { loginUser } from "../api.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setStatus(TEXT.LOGIN.errors.required);
      return;
    }

    try {
      const data = await loginUser({ email: email.trim() });
      login(data.user?.email || email.trim(), data.user?.name || "", data.user?.id, {
        tier: data.user?.tier,
        phoneNumber: data.user?.phoneNumber,
        userType: data.user?.userType || "individual",
      });
      navigate("/app");
    } catch (error) {
      setStatus(error.message || "Could not log in.");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <Logo size={36} />
          <p className="authEyebrow">{TEXT.APP_NAME}</p>
          <h2 className="authTitle">{TEXT.LOGIN.title}</h2>
          <p className="authSubtitle">{TEXT.LOGIN.subtitle}</p>
        </div>
        <form className="authForm" onSubmit={handleSubmit}>
          <div className="field">
            <label>{TEXT.LOGIN.labels.email}</label>
            <input
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="field">
            <label>{TEXT.LOGIN.labels.password}</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>
          {status && <p className="status">{status}</p>}
          <button className="primary" type="submit">
            {TEXT.LOGIN.cta}
          </button>
        </form>
        <p className="authFooter">
          {TEXT.LOGIN.footer.prompt} <Link to="/signup">{TEXT.LOGIN.footer.link}</Link>
        </p>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Login form for auth flow.
 */
