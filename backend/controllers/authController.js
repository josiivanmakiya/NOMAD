const User = require("../models/User");
const OtpCode = require("../models/OtpCode");
const crypto = require("crypto");

const normalizePhone = (value) =>
  String(value || "")
    .replace(/\s+/g, "")
    .trim();

const hashValue = (value) =>
  crypto.createHash("sha256").update(String(value || "")).digest("hex");

const randomUsername = () => `nomad_${Math.floor(Math.random() * 1_000_000)}`;

const getUserPayload = (user) => ({
  id: user._id,
  name: user.name || "",
  businessName: user.businessName || "",
  email: user.email || "",
  phoneNumber: user.phoneNumber || "",
  tier: Number(user.tier || 0),
  userType: user.userType || "individual",
});

const sendOtp = async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.body?.phoneNumber);
    if (!phoneNumber) {
      return res.status(400).json({ ok: false, message: "Phone number is required." });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpCode.findOneAndUpdate(
      { phoneNumber },
      { $set: { code, expiresAt, attempts: 0 } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Verification code sent.",
      ...(process.env.NODE_ENV !== "production" ? { devOtp: code } : {}),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.body?.phoneNumber);
    const otp = String(req.body?.otp || "").trim();
    const pin = String(req.body?.pin || "").trim();
    const password = String(req.body?.password || "").trim();

    if (!phoneNumber || !otp) {
      return res.status(400).json({ ok: false, message: "phoneNumber and otp are required." });
    }
    if (pin.length < 4) {
      return res.status(400).json({ ok: false, message: "PIN must be at least 4 digits." });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: "Password must be at least 6 characters." });
    }

    const record = await OtpCode.findOne({ phoneNumber });
    if (!record) {
      return res.status(400).json({ ok: false, message: "OTP not found. Request a new code." });
    }
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ ok: false, message: "OTP expired. Request a new code." });
    }
    if (record.code !== otp) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ ok: false, message: "Invalid OTP." });
    }

    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await User.create({
        phoneNumber,
        username: randomUsername(),
        tier: 0,
        identityStatus: "unverified",
        userType: "individual",
      });
    }

    user.passwordHash = hashValue(password);
    user.pinHash = hashValue(pin);
    await user.save();
    await OtpCode.deleteOne({ _id: record._id });

    return res.status(200).json({
      ok: true,
      token: user._id.toString(),
      user: getUserPayload(user),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { name, businessName, email, phoneNumber, userType } = req.body || {};
    if (!email) {
      return res.status(400).json({ ok: false, message: "Email is required." });
    }
    const normalizedUserType = String(userType || "individual").toLowerCase();
    if (!["individual", "business"].includes(normalizedUserType)) {
      return res.status(400).json({ ok: false, message: "userType must be individual or business." });
    }
    if (normalizedUserType === "business" && !String(businessName || "").trim()) {
      return res.status(400).json({ ok: false, message: "Business name is required for business accounts." });
    }
    const user = await User.create({
      name: name?.trim(),
      businessName: normalizedUserType === "business" ? String(businessName || "").trim() : "",
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber ? normalizePhone(phoneNumber) : undefined,
      tier: 0,
      userType: normalizedUserType,
    });
    return res.status(201).json({
      ok: true,
      user: getUserPayload(user),
      token: user._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ ok: false, message: "Email is required." });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found." });
    }
    return res.status(200).json({
      ok: true,
      user: getUserPayload(user),
      token: user._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found." });
    }
    return res.status(200).json({
      ok: true,
      user: getUserPayload(user),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  signup,
  login,
  me,
};

/**
 * FILE ROLE:
 * Auth endpoints for signup/login.
 */
