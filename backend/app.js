const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");

const { handleWebhook } = require("./controllers/paystackWebhookController");

const depositRoutes = require("./routes/depositRoutes");
const releaseRoutes = require("./routes/releaseRoutes");
const lockRoutes = require("./routes/lockRoutes");
const unlockRoutes = require("./routes/unlockRoutes");
const rulesRoutes = require("./routes/rulesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paystackRoutes = require("./routes/paystackRoutes");
const historyRoutes = require("./routes/historyRoutes");
const nomadRoutes = require("./routes/nomadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const identityRoutes = require("./routes/identityRoutes");
const accountRoutes = require("./routes/accountRoutes");
const disciplineProtocolRoutes = require("./routes/disciplineProtocolRoutes");
const disciplineRoutes = require("./routes/disciplineRoutes");
const legacyLockRoutes = require("./routes/legacyLockRoutes");
const genesisRoutes = require("./routes/genesisRoutes");
const waitlistRoutes = require("./routes/waitlistRoutes");
const founderRoutes = require("./routes/founderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");
const createGlobalRateLimiter = require("./middleware/globalRateLimit");

dotenv.config();

const app = express();
const globalRateLimiter = createGlobalRateLimiter();

const corsOrigins = String(process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (corsOrigins.includes(origin)) return true;
  if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) {
    return true;
  }
  return false;
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false
  })
);
app.use(helmet());
app.use(compression());

// Paystack webhook expects raw body for signature verification.
app.post("/api/paystack/webhook", express.raw({ type: "application/json" }), handleWebhook);

app.use(express.json());
app.use("/api", (req, res, next) => {
  if (req.path === "/paystack/webhook") return next();
  return globalRateLimiter(req, res, next);
});

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true, message: "NOMAD v1 backend running." });
});

app.use("/api/deposits", depositRoutes);
app.use("/api/releases", releaseRoutes);
app.use("/api/locks", lockRoutes);
app.use("/api/unlocks", unlockRoutes);
app.use("/api/rules", rulesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/nomad", nomadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/identity", identityRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/protocols", disciplineProtocolRoutes);
app.use("/api/discipline", disciplineRoutes);
app.use("/api/dynasty", legacyLockRoutes);
app.use("/api/genesis", genesisRoutes);
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/founder", founderRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;

/**
 * FILE ROLE:
 * Express app composition and route wiring for the NOMAD backend.
 *
 * CONNECTS TO:
 * - routes/* (API routing)
 * - paystackWebhookController (raw-body webhook handling)
 *
 * USED BY:
 * - server.js (server bootstrap)
 *
 * NOTES:
 * - Does not implement business logic itself.
 * - Central place for HTTP surface of the backend.
 */

