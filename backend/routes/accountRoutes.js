const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireMinimumTier = require("../middleware/requireMinimumTier");
const { linkAccount, listAccounts, deleteAccount } = require("../controllers/accountController");

const router = express.Router();

router.get("/", requireAuth, listAccounts);
router.post("/link", requireAuth, requireMinimumTier(1), linkAccount);
router.delete("/:accountId", requireAuth, deleteAccount);

module.exports = router;

/**
 * FILE ROLE:
 * Linked account routes for NOMAD.
 */
