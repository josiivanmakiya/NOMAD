const mongoose = require("mongoose");
const User = require("../models/User");

const isBypassEnabled = () => {
  const envValue = String(process.env.AUTH_BYPASS || "").toLowerCase();
  if (envValue === "true") return true;
  if (envValue === "false") return false;
  return false;
};

const resolveUserId = (req) => {
  const headerUserId = req.headers["x-user-id"];
  const bearer = req.headers.authorization;
  if (headerUserId) return String(headerUserId).trim();
  if (bearer && bearer.startsWith("Bearer ")) {
    return bearer.replace("Bearer ", "").trim();
  }
  return "";
};

const requireAuth = async (req, res, next) => {
  let userId = resolveUserId(req);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  if (!userId) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  const exists = await User.exists({ _id: userId }).catch(() => null);
  if (!exists) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  req.user = { id: userId };
  next();
};

module.exports = requireAuth;

/**
 * FILE ROLE:
 * Lightweight auth shim that injects a user id for pre-production.
 *
 * CONNECTS TO:
 * - ENV MOCK_USER_ID
 *
 * USED BY:
 * - routes/* (all authenticated routes)
 *
 * NOTES:
 * - Replace with real auth before production.
 */
