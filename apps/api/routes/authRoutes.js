const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { sendOtp, verifyOtp, signup, login, me } = require("../controllers/authController");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);

module.exports = router;

/**
 * FILE ROLE:
 * Auth routes for signup/login.
 */
