const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  adminUsers,
  adminWaitlistLogs,
  adminWaitlistEntries,
} = require("../controllers/admin/adminController");

const router = express.Router();

router.get("/users", requireAuth, adminUsers);
router.get("/waitlist-logs", requireAuth, adminWaitlistLogs);
router.get("/waitlist", requireAuth, adminWaitlistEntries);

module.exports = router;

/**
 * FILE ROLE:
 * Admin-only API surface.
 *
 * CONNECTS TO:
 * - middleware/requireAuth.js
 * - controllers/admin/adminController.js
 */
