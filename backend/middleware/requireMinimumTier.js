const User = require("../models/User");

const requireMinimumTier = (minimumTier) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("tier");
    if (!user) {
      return res.status(401).json({ ok: false, message: "Unauthorized." });
    }

    if (Number(user.tier || 0) < Number(minimumTier)) {
      return res.status(403).json({
        ok: false,
        message: `Tier ${minimumTier} verification required for this action.`,
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = requireMinimumTier;

