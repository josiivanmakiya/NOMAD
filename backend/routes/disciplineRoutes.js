const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  me,
  tiers,
  award,
  recalc,
} = require("../controllers/disciplineController");

const router = express.Router();

router.get("/me", requireAuth, me);
router.get("/tiers", tiers);
router.post("/award", requireAuth, award);
router.post("/recalculate", requireAuth, recalc);

module.exports = router;
