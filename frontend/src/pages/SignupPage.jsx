import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import Logo from "../components/Logo.jsx";
import { TEXT } from "../content/text.js";
import { signupUser } from "../api.js";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("individual");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setStatus(TEXT.SIGNUP.errors.required);
      return;
    }
    if (userType === "business" && !businessName.trim()) {
      setStatus(TEXT.SIGNUP.errors.businessNameRequired);
      return;
    }
    if (password !== confirmPassword) {
      setStatus(TEXT.SIGNUP.errors.mismatch);
      return;
    }
    try {
      const data = await signupUser({
        name: name.trim(),
        businessName: userType === "business" ? businessName.trim() : "",
        email: email.trim(),
        phoneNumber: phone.trim(),
        userType,
      });
      login(data.user?.email || email.trim(), data.user?.name || name.trim(), data.user?.id, {
        tier: data.user?.tier,
        phoneNumber: data.user?.phoneNumber || phone.trim(),
        userType: data.user?.userType || userType,
      });
      navigate("/verify/identity");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <Logo size={36} />
          <p className="authEyebrow">{TEXT.APP_NAME}</p>
          <h2 className="authTitle">{TEXT.SIGNUP.title}</h2>
          <p className="authSubtitle">{TEXT.SIGNUP.subtitle}</p>
        </div>
        <form className="authForm" onSubmit={handleSubmit}>
          <div className="field">
            <label>{TEXT.SIGNUP.labels.userType}</label>
            <div className="signupTypeGrid">
              <label className={`signupTypeCard ${userType === "individual" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="userType"
                  value="individual"
                  checked={userType === "individual"}
                  onChange={(event) => setUserType(event.target.value)}
                />
                <span className="signupTypeTitle">Individual</span>
                <span className="signupTypeHint">Personal discipline vault</span>
              </label>
              <label className={`signupTypeCard ${userType === "business" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  checked={userType === "business"}
                  onChange={(event) => setUserType(event.target.value)}
                />
                <span className="signupTypeTitle">Business</span>
                <span className="signupTypeHint">Enable Profit Firewall workflows</span>
              </label>
            </div>
          </div>
          <div className="field">
            <label>{TEXT.SIGNUP.labels.name}</label>
            <input
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
            />
          </div>
          {userType === "business" ? (
            <div className="field">
              <label>{TEXT.SIGNUP.labels.businessName}</label>
              <input
                className="input"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Registered business name"
              />
            </div>
          ) : null}
          <div className="field">
            <label>{TEXT.SIGNUP.labels.email}</label>
            <input
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="field">
            <label>{TEXT.SIGNUP.labels.phone}</label>
            <input
              className="input"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+234 000 000 0000"
            />
          </div>
          <div className="field">
            <label>{TEXT.SIGNUP.labels.password}</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
            />
          </div>
          <div className="field">
            <label>{TEXT.SIGNUP.labels.confirmPassword}</label>
            <input
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
            />
          </div>
          {status && <p className="status">{status}</p>}
          <button className="primary" type="submit">
            {TEXT.SIGNUP.cta}
          </button>
        </form>
        <p className="authFooter">
          {TEXT.SIGNUP.footer.prompt} <Link to="/login">{TEXT.SIGNUP.footer.link}</Link>
        </p>
      </div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Signup form for auth flow.
 *
 * CONNECTS TO:
 * - state/AuthContext.jsx
 * - components/Logo.jsx
 *
 * USED BY:
 * - src/App.jsx (/signup)
 *
 * CHANGELOG:
 * - Moved all copy to TEXT.SIGNUP.
 * - Kept validation logic intact, only swapped messages.
 */
