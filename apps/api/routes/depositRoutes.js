const express = require("express");
const { preview, confirm, list } = require("../controllers/depositController");
const requireAuth = require("../middleware/requireAuth");
const requireIdempotencyKey = require("../middleware/requireIdempotencyKey");

const router = express.Router();

router.get("/", requireAuth, list);
router.post("/preview", requireAuth, preview);
router.post("/confirm", requireAuth, requireIdempotencyKey, confirm);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for deposit preview/confirm/list.
 *
 * CONNECTS TO:
 * - controllers/depositController.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 */
