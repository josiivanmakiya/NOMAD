const cron = require("node-cron");
const { processAutoRelockCandidates } = require("../services/autoRelockService");

const startAutoRelockJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const result = await processAutoRelockCandidates();
      if (result.scannedUsers > 0 || result.maturedLocks > 0) {
        console.log(
          `[${new Date().toISOString()}] AutoRelock job users=${result.scannedUsers} matured=${result.maturedLocks} relocked=${result.relocked}`
        );
      }
    } catch (error) {
      console.error("AutoRelock job error:", error.message);
    }
  });
};

module.exports = {
  startAutoRelockJob,
};
