const errorHandler = (error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const message =
    status >= 500 ? "Unexpected server error." : error.message || "Request failed.";

  return res.status(status).json({
    ok: false,
    message,
  });
};

module.exports = errorHandler;
