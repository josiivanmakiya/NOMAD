const express = require("express");
const { chat, publicChat } = require("../controllers/nomadChatController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/public-chat", publicChat);
router.post("/chat", requireAuth, chat);

module.exports = router;

/**
 * FILE ROLE:
 * Routes for NOMAD chat proxy.
 *
 * CONNECTS TO:
 * - controllers/nomadChatController.js
 * - middleware/requireAuth.js
 */
