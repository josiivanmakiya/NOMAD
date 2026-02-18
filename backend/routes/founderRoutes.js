const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  adminUsers,
  adminWaitlistLogs,
  adminWaitlistEntries,
} = require("../controllers/admin/adminController");

const router = express.Router();

// Legacy alias kept for backward compatibility; prefer /api/admin/*.
router.get("/users", requireAuth, adminUsers);
router.get("/waitlist-logs", requireAuth, adminWaitlistLogs);
router.get("/waitlist", requireAuth, adminWaitlistEntries);

module.exports = router;
