import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import Logo from "../../components/Logo.jsx";
import { TEXT } from "./text.js";
import { signupUser } from "../../api.js";

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
    <div className="min-h-screen bg-[#070707] text-[#f5f2eb] font-mono">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl border border-[rgba(245,242,235,0.2)] bg-[#0b0b0b] p-8">
          <div className="mb-8 flex items-center gap-3">
            <Logo size={32} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#888]">
                {TEXT.APP_NAME}
              </p>
              <h1 className="font-display text-4xl tracking-[0.08em] text-white">
                {TEXT.SIGNUP.title}
              </h1>
              <p className="text-xs text-[#9a9a9a]">{TEXT.SIGNUP.subtitle}</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                {TEXT.SIGNUP.labels.userType}
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label
                  className={`cursor-pointer border px-4 py-4 transition ${
                    userType === "individual"
                      ? "border-white bg-[#111111]"
                      : "border-[rgba(245,242,235,0.2)] bg-[#0f0f0f]"
                  }`}
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="userType"
                    value="individual"
                    checked={userType === "individual"}
                    onChange={(event) => setUserType(event.target.value)}
                  />
                  <span className="block text-sm font-semibold text-white">Individual</span>
                  <span className="block text-xs text-[#888]">Personal discipline vault</span>
                </label>
                <label
                  className={`cursor-pointer border px-4 py-4 transition ${
                    userType === "business"
                      ? "border-white bg-[#111111]"
                      : "border-[rgba(245,242,235,0.2)] bg-[#0f0f0f]"
                  }`}
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="userType"
                    value="business"
                    checked={userType === "business"}
                    onChange={(event) => setUserType(event.target.value)}
                  />
                  <span className="block text-sm font-semibold text-white">Business</span>
                  <span className="block text-xs text-[#888]">Enable Profit Firewall workflows</span>
                </label>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  {TEXT.SIGNUP.labels.name}
                </label>
                <input
                  className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                />
              </div>
              {userType === "business" ? (
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                    {TEXT.SIGNUP.labels.businessName}
                  </label>
                  <input
                    className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    placeholder="Registered business name"
                  />
                </div>
              ) : null}
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  {TEXT.SIGNUP.labels.email}
                </label>
                <input
                  className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  {TEXT.SIGNUP.labels.phone}
                </label>
                <input
                  className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+234 000 000 0000"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  {TEXT.SIGNUP.labels.password}
                </label>
                <input
                  className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                  {TEXT.SIGNUP.labels.confirmPassword}
                </label>
                <input
                  className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat your password"
                />
              </div>
            </div>

            {status && (
              <p className="border-l-2 border-[#c0392b] bg-[#0f0f0f] px-3 py-2 text-xs text-[#cbb3a8]">
                {status}
              </p>
            )}
            <button
              className="w-full border border-white bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-[#070707] transition hover:bg-[#e6e6e6]"
              type="submit"
            >
              {TEXT.SIGNUP.cta}
            </button>
          </form>

          <p className="mt-6 text-xs text-[#888]">
            {TEXT.SIGNUP.footer.prompt}{" "}
            <Link className="text-white underline" to="/login">
              {TEXT.SIGNUP.footer.link}
            </Link>
          </p>
        </div>
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
