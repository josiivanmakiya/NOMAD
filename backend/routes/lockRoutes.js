const express = require("express");
const { runMaturityCheck, list } = require("../controllers/lockController");
const requireAuth = require("../middleware/requireAuth");
const { trackTimerChecks } = require("../middleware/behavioralTracker");

const router = express.Router();

router.get("/", requireAuth, trackTimerChecks, list);
router.post("/check-maturity", requireAuth, runMaturityCheck);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for lock listing and manual maturity checks.
 *
 * CONNECTS TO:
 * - controllers/lockController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
