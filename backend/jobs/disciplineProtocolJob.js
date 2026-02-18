const cron = require("node-cron");
const { processDueProtocols } = require("../services/disciplineProtocolService");

const startDisciplineProtocolJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await processDueProtocols();
      if (result.dueCount > 0) {
        console.log(
          `[${new Date().toISOString()}] Discipline protocols due=${result.dueCount} processed=${result.processed} failed=${result.failed}`
        );
      }
    } catch (error) {
      console.error("Error processing discipline protocols:", error.message);
    }
  });
};

module.exports = {
  startDisciplineProtocolJob,
};
