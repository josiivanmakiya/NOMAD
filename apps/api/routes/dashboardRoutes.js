const express = require("express");
const { summary } = require("../controllers/dashboardController");
const requireAuth = require("../middleware/requireAuth");
const { withRedisCache } = require("../middleware/redisCache");

const router = express.Router();

router.get("/summary", requireAuth, withRedisCache(30, { prefix: "dashboard-summary" }), summary);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for dashboard summaries.
 *
 * CONNECTS TO:
 * - controllers/dashboardController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
