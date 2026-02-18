const express = require("express");
const {
  getCurrent,
  getActive,
  createPenaltyProfile,
  createRuleSet,
} = require("../controllers/rulesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/current", requireAuth, getCurrent);
router.get("/active", requireAuth, getActive);
router.post("/penalty-profiles", requireAuth, createPenaltyProfile);
router.post("/rule-sets", requireAuth, createRuleSet);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for rule sets and penalty profiles (legacy/admin).
 *
 * CONNECTS TO:
 * - controllers/rulesController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
