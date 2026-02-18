const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  create,
  list,
  setIrrevocable,
  transferReadiness,
} = require("../controllers/legacyLockController");

const router = express.Router();

router.get("/", requireAuth, list);
router.post("/", requireAuth, create);
router.post("/:legacyLockId/irrevocable", requireAuth, setIrrevocable);
router.get("/:legacyLockId/readiness", requireAuth, transferReadiness);

module.exports = router;

