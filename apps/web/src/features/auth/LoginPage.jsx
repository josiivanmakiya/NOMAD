import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";
import Logo from "../../components/Logo.jsx";
import { TEXT } from "./text.js";
import { loginUser } from "../../api.js";

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
      if (import.meta.env.DEV) {
        login(email.trim(), "", "dev-user", { tier: "Prospect", userType: "individual" });
        navigate("/app");
        return;
      }
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
    <div className="min-h-screen bg-[#070707] text-[#f5f2eb] font-mono">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md border border-[rgba(245,242,235,0.2)] bg-[#0b0b0b] p-8">
          <div className="mb-8 flex items-center gap-3">
            <Logo size={32} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#888]">
                {TEXT.APP_NAME}
              </p>
              <h1 className="font-display text-4xl tracking-[0.08em] text-white">
                {TEXT.LOGIN.title}
              </h1>
              <p className="text-xs text-[#9a9a9a]">{TEXT.LOGIN.subtitle}</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#888]">
                {TEXT.LOGIN.labels.email}
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
                {TEXT.LOGIN.labels.password}
              </label>
              <input
                className="w-full border border-[rgba(245,242,235,0.2)] bg-transparent px-4 py-3 text-sm text-[#f5f2eb] outline-none placeholder:text-[#666] focus:border-white"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
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
              {TEXT.LOGIN.cta}
            </button>
          </form>

          <p className="mt-6 text-xs text-[#888]">
            {TEXT.LOGIN.footer.prompt}{" "}
            <Link className="text-white underline" to="/signup">
              {TEXT.LOGIN.footer.link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
