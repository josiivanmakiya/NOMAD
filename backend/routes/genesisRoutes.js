const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getSummary,
  getBriefings,
  submitWeeklyAudit,
  listMyAudits,
  adminUsers,
} = require("../controllers/genesisController");

const router = express.Router();

router.get("/summary", getSummary);
router.get("/briefings", getBriefings);
router.get("/audits/me", requireAuth, listMyAudits);
router.post("/audits", requireAuth, submitWeeklyAudit);
router.get("/admin/users", requireAuth, adminUsers);

module.exports = router;
