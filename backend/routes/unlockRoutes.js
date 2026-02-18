const express = require("express");
const { preview, confirm } = require("../controllers/unlockController");
const requireAuth = require("../middleware/requireAuth");
const requireIdempotencyKey = require("../middleware/requireIdempotencyKey");
const frictionRateLimit = require("../middleware/frictionRateLimit");

const router = express.Router();

router.post("/preview", requireAuth, preview);
router.post("/confirm", requireAuth, frictionRateLimit, requireIdempotencyKey, confirm);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for early unlock preview/confirm.
 *
 * CONNECTS TO:
 * - controllers/unlockController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
