const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { getRedisClient, isRedisReady } = require("../services/redisClient");

const toInt = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
};

const createGlobalRateLimiter = () => {
  const windowMs = toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000);
  const maxRequests = toInt(process.env.RATE_LIMIT_MAX_REQUESTS, 300);
  const redisClient = getRedisClient();

  const limiterOptions = {
    windowMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      message: "Too many requests. Please retry shortly.",
    },
  };

  if (redisClient && isRedisReady()) {
    limiterOptions.store = new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }

  return rateLimit(limiterOptions);
};

module.exports = createGlobalRateLimiter;
