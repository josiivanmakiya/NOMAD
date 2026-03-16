const express = require("express");
const { preview, confirm } = require("../controllers/releaseController");
const requireAuth = require("../middleware/requireAuth");
const requireIdempotencyKey = require("../middleware/requireIdempotencyKey");

const router = express.Router();

router.get("/:depositId/preview", requireAuth, preview);
router.post("/:depositId/confirm", requireAuth, requireIdempotencyKey, confirm);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for matured deposit release preview/confirm.
 *
 * CONNECTS TO:
 * - controllers/releaseController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
