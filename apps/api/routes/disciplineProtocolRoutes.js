const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  create,
  list,
  pause,
  resume,
  cancel,
  recommendation,
} = require("../controllers/disciplineProtocolController");

const router = express.Router();

router.get("/", requireAuth, list);
router.post("/", requireAuth, create);
router.get("/recommendation/cost", requireAuth, recommendation);
router.post("/:protocolId/pause", requireAuth, pause);
router.post("/:protocolId/resume", requireAuth, resume);
router.post("/:protocolId/cancel", requireAuth, cancel);

module.exports = router;
