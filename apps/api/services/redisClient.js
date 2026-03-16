const Redis = require("ioredis");

let redisClient;
let redisReady = false;

const isRedisEnabled = () =>
  String(process.env.REDIS_ENABLED || "true").toLowerCase() === "true";

const getRedisClient = () => {
  if (redisClient !== undefined) {
    return redisClient;
  }

  if (!isRedisEnabled()) {
    redisClient = null;
    redisReady = false;
    return redisClient;
  }

  const redisUrl = String(process.env.REDIS_URL || "").trim();
  if (!redisUrl) {
    redisClient = null;
    redisReady = false;
    return redisClient;
  }

  redisClient = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    enableReadyCheck: false,
    retryStrategy: () => null,
    connectTimeout: 1000,
  });

  redisClient.on("ready", () => {
    redisReady = true;
    console.log("Redis connected.");
  });

  redisClient.on("error", (error) => {
    redisReady = false;
    console.error("Redis error:", error.message);
  });

  redisClient.on("end", () => {
    redisReady = false;
  });

  redisClient.connect().catch((error) => {
    redisReady = false;
    console.error("Redis disabled for this runtime:", error.message);
  });

  return redisClient;
};

module.exports = {
  getRedisClient,
  isRedisReady: () => redisReady,
};
