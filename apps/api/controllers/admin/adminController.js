const {
  adminUsers,
  adminWaitlistLogs,
  adminWaitlistEntries,
} = require("../genesisController");

module.exports = {
  adminUsers,
  adminWaitlistLogs,
  adminWaitlistEntries,
};

/**
 * FILE ROLE:
 * Admin controller boundary for founder-only operations.
 *
 * CONNECTS TO:
 * - controllers/genesisController.js (shared admin handlers)
 *
 * USED BY:
 * - routes/adminRoutes.js
 */
