const User = require("../models/User");

const verifyIdentity = async (req, res) => {
  try {
    const { provider, verifiedName } = req.body || {};
    const userId = req.user.id;
    if (!verifiedName) {
      return res.status(400).json({ ok: false, message: "Verified name is required." });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          verifiedName: verifiedName.trim(),
          identityStatus: "verified",
          identityProvider: provider || "self_attested",
          kycVerified: true,
          tier: 1,
        },
      },
      { new: true, upsert: true }
    );
    return res.status(200).json({
      ok: true,
      identity: {
        status: user.identityStatus,
        verifiedName: user.verifiedName,
        provider: user.identityProvider,
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  verifyIdentity,
};

/**
 * FILE ROLE:
 * Identity verification endpoint.
 */
