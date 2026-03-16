const express = require("express");

const requireAuth = require("../middleware/requireAuth");
const charge = require("../controllers/paystackChargeController");
const recipients = require("../controllers/paystackRecipientsController");
const transactions = require("../controllers/paystackTransactionsController");
const transfers = require("../controllers/paystackTransfersController");
const misc = require("../controllers/paystackMiscController");
const verification = require("../controllers/paystackVerificationController");

const router = express.Router();

router.use(requireAuth);

router.post("/transactions/initialize", transactions.initialize);
router.get("/transactions/verify/:reference", transactions.verify);
router.get("/transactions", transactions.list);
router.get("/transactions/:id", transactions.fetchOne);
router.post("/transactions/charge-authorization", transactions.chargeAuthorization);
router.get("/transactions/timeline/:idOrReference", transactions.timeline);

router.post("/charge", charge.create);
router.post("/charge/submit-pin", charge.submitPin);
router.post("/charge/submit-otp", charge.submitOtp);
router.post("/charge/submit-phone", charge.submitPhone);
router.post("/charge/submit-birthday", charge.submitBirthday);
router.post("/charge/submit-address", charge.submitAddress);
router.get("/charge/pending/:reference", charge.checkPending);

router.post("/recipients", recipients.create);
router.post("/recipients/bulk", recipients.bulk);
router.get("/recipients", recipients.list);
router.get("/recipients/:idOrCode", recipients.fetchOne);
router.put("/recipients/:idOrCode", recipients.update);
router.delete("/recipients/:idOrCode", recipients.remove);

router.post("/transfers", transfers.initiate);
router.post("/transfers/finalize", transfers.finalize);
router.post("/transfers/bulk", transfers.bulk);
router.get("/transfers", transfers.list);
router.get("/transfers/:idOrCode", transfers.fetchOne);
router.get("/transfers/verify/:reference", transfers.verify);
router.post("/transfers/resend-otp", transfers.resendOtp);
router.post("/transfers/disable-otp", transfers.disableOtp);
router.post("/transfers/disable-otp/finalize", transfers.finalizeDisableOtp);
router.post("/transfers/enable-otp", transfers.enableOtp);
router.get("/transfers/balance", transfers.balance);
router.get("/transfers/ledger", transfers.ledger);

router.get("/verification/bank/resolve", verification.resolveAccount);
router.post("/verification/bank/validate", verification.validateAccount);
router.get("/verification/bin/:bin", verification.resolveBin);

router.get("/misc/banks", misc.listBanks);
router.get("/misc/countries", misc.listCountries);

module.exports = router;

/**
 * FILE ROLE:
 * Routes exposing Paystack proxy endpoints.
 *
 * CONNECTS TO:
 * - controllers/paystack*Controller.js
 * - middleware/requireAuth.js
 *
 * USED BY:
 * - app.js
 *
 * NOTES:
 * - Funding verification and payout services use these endpoints internally.
 */
