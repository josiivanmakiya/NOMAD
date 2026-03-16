const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createDepositIntent,
  confirmDepositIntent,
  createPayout,
  verifyAccount,
  validateAccountNumber,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/deposit-intent", requireAuth, createDepositIntent);
router.post("/deposit-confirm", requireAuth, confirmDepositIntent);
router.post("/payout", requireAuth, createPayout);
router.post("/verify-account", requireAuth, verifyAccount);
router.post("/validate-nuban", requireAuth, validateAccountNumber);

module.exports = router;

/**
 * FILE ROLE:
 * Payment rails routes.
 */
