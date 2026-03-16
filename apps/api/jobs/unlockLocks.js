const cron = require("node-cron");
const { checkMaturity } = require("../services/lockService");

const startUnlockLocksJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const result = await checkMaturity();
      console.log(
        `[${new Date().toISOString()}] Maturity job processed ${result.maturedCount} deposits`
      );
    } catch (error) {
      console.error("Error processing maturity checks:", error.message);
    }
  });
};

module.exports = {
  startUnlockLocksJob,
};

/**
 * FILE ROLE:
 * Cron job that marks deposits as matured based on maturesAt.
 *
 * CONNECTS TO:
 * - services/lockService.js
 *
 * USED BY:
 * - server.js
 *
 * NOTES:
 * - Runs every 10 minutes in pre-production.
 */
