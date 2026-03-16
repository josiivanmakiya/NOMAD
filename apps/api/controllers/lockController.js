const { checkMaturity, listLocks } = require("../services/lockService");

const runMaturityCheck = async (_req, res) => {
  try {
    const result = await checkMaturity();
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const locks = await listLocks(req.user.id);
    return res.status(200).json({ ok: true, locks });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  runMaturityCheck,
  list,
};

/**
 * FILE ROLE:
 * Exposes lock listing and manual maturity checks.
 *
 * CONNECTS TO:
 * - services/lockService.js
 *
 * USED BY:
 * - routes/lockRoutes.js
 *
 * NOTES:
 * - Intended for admin/debug use in pre-production.
 */
