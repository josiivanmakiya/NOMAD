const mongoose = require("mongoose");
const app = require("./app");
const { startUnlockLocksJob } = require("./jobs/unlockLocks");
const { startDisciplineProtocolJob } = require("./jobs/disciplineProtocolJob");
const { startAutoRelockJob } = require("./jobs/autoRelockJob");
const { ensureTierConfig } = require("./services/disciplineService");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/NOMAD";

mongoose.set("strictQuery", true);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await ensureTierConfig();
    startUnlockLocksJob();
    startDisciplineProtocolJob();
    startAutoRelockJob();
    const basePort = Number(PORT);
    const maxPortAttempts = 10;

    const listenWithFallback = (port, attemptsLeft) => {
      const server = app.listen(port, () => {
        console.log(`NOMAD backend listening on port ${port}`);
      });

      server.on("error", (error) => {
        if (error?.code === "EADDRINUSE" && attemptsLeft > 0) {
          const nextPort = port + 1;
          console.warn(`Port ${port} in use. Retrying on ${nextPort}...`);
          setTimeout(() => listenWithFallback(nextPort, attemptsLeft - 1), 120);
          return;
        }

        console.error("Failed to start HTTP server:", error.message);
        process.exit(1);
      });
    };

    if (!Number.isFinite(basePort) || basePort <= 0) {
      throw new Error(`Invalid PORT value: ${PORT}`);
    }

    listenWithFallback(Math.floor(basePort), maxPortAttempts);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

/**
 * FILE ROLE:
 * Boots the NOMAD backend: connects to MongoDB and starts HTTP + cron jobs.
 *
 * CONNECTS TO:
 * - app.js (Express app)
 * - jobs/unlockLocks.js (maturity cron)
 *
 * USED BY:
 * - Node runtime entrypoint
 *
 * NOTES:
 * - Treats server as pre-production; no clustering or scaling concerns.
 */

