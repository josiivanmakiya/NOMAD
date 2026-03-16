const { getRedisClient, isRedisReady } = require("../services/redisClient");

const toInt = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
};

const withRedisCache = (ttlSeconds = 30, options = {}) => {
  const prefix = String(options.prefix || "cache");
  const ttl = toInt(ttlSeconds, 30);

  return async (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    const redisClient = getRedisClient();
    if (!redisClient || !isRedisReady()) {
      return next();
    }

    const userId = String(req.user?.id || req.headers["x-user-id"] || "public");
    const cacheKey = `${prefix}:${userId}:${req.originalUrl}`;

    try {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }
    } catch (error) {
      console.error("Redis cache read failed:", error.message);
      return next();
    }

    const originalJson = res.json.bind(res);
    res.json = (payload) => {
      const body = payload;
      redisClient
        .set(cacheKey, JSON.stringify(body), "EX", ttl)
        .catch((error) => console.error("Redis cache write failed:", error.message));
      return originalJson(body);
    };

    return next();
  };
};

module.exports = {
  withRedisCache,
};
