const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { verifyIdentity } = require("../controllers/identityController");

const router = express.Router();

router.post("/verify", requireAuth, verifyIdentity);

module.exports = router;

/**
 * FILE ROLE:
 * Mock identity verification routes.
 */
