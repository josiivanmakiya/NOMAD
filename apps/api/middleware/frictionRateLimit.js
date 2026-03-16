const WINDOW_MS = 60 * 1000;
const BLOCK_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const attemptsByUser = new Map();

const frictionRateLimit = (req, res, next) => {
  const userId = req.user?.id || "anonymous";
  const now = Date.now();
  const record = attemptsByUser.get(userId) || {
    attempts: [],
    blockedUntil: 0,
  };

  if (record.blockedUntil > now) {
    return res.status(429).json({
      ok: false,
      message: "Early unlock temporarily blocked for 1 hour due to repeated attempts.",
    });
  }

  record.attempts = record.attempts.filter((timestamp) => now - timestamp <= WINDOW_MS);
  record.attempts.push(now);

  if (record.attempts.length > MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_MS;
    attemptsByUser.set(userId, record);
    return res.status(429).json({
      ok: false,
      message: "Early unlock temporarily blocked for 1 hour due to repeated attempts.",
    });
  }

  attemptsByUser.set(userId, record);
  return next();
};

module.exports = frictionRateLimit;
