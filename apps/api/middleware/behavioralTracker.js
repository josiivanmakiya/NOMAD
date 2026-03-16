const User = require("../models/User");

const trackTimerChecks = async (req, _res, next) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      await User.updateOne(
        { _id: userId },
        { $inc: { "metrics.timerCheckCount": 1 } }
      );
    }
  } catch (_error) {
    // No-op: tracking must not block request flow.
  }
  next();
};

module.exports = {
  trackTimerChecks,
};

