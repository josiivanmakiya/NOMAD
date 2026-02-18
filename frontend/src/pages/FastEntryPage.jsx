import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../api.js";
import { useAuth } from "../state/AuthContext.jsx";

export default function FastEntryPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const data = await sendOtp({ phoneNumber });
      setOtpSent(true);
      setStatus(data.message || "Verification code sent.");
      if (data.devOtp) setDevOtp(data.devOtp);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const data = await verifyOtp({ phoneNumber, otp, pin, password });
      login(
        data.user?.email || "",
        data.user?.name || "",
        data.user?.id,
        {
          tier: data.user?.tier,
          phoneNumber: data.user?.phoneNumber || phoneNumber,
        }
      );
      navigate("/app/home");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <p className="authEyebrow">NOMAD FAST ENTRY</p>
          <h2 className="authTitle">Open a Vault in 10 Seconds</h2>
          <p className="authSubtitle">Phone number first. KYC only when you want to lock money.</p>
        </div>

        {!otpSent ? (
          <form className="authForm" onSubmit={handleSendOtp}>
            <label>Phone number</label>
            <input
              className="input"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="+234..."
            />
            <button className="primary" type="submit" disabled={loading}>
              Send OTP
            </button>
          </form>
        ) : (
          <form className="authForm" onSubmit={handleVerifyOtp}>
            <label>OTP code</label>
            <input
              className="input"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="6-digit code"
            />
            <label>4-digit PIN</label>
            <input
              className="input"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="PIN"
              maxLength={6}
            />
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            {devOtp ? <p className="hint">Dev OTP: {devOtp}</p> : null}
            <button className="primary" type="submit" disabled={loading}>
              Verify and enter vault
            </button>
          </form>
        )}

        {status ? <p className="status">{status}</p> : null}
        <p className="authFooter">
          Prefer email? <Link to="/signup">Use standard signup</Link>
        </p>
      </div>
    </div>
  );
}

