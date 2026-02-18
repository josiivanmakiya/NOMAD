const express = require("express");
const { joinWaitlist } = require("../controllers/genesisController");

const router = express.Router();

// Canonical waitlist contract endpoint.
router.post("/", joinWaitlist);

module.exports = router;
