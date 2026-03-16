const express = require("express");
const { list } = require("../controllers/historyController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, list);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for history feed.
 *
 * CONNECTS TO:
 * - controllers/historyController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
