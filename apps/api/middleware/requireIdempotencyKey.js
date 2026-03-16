const requireIdempotencyKey = (req, res, next) => {
  const key = req.headers["x-idempotency-key"] || req.headers["idempotency-key"];

  if (!key || !String(key).trim()) {
    return res.status(400).json({
      ok: false,
      message: "X-Idempotency-Key header is required for this operation.",
    });
  }

  return next();
};

module.exports = requireIdempotencyKey;
