const Deposit = require("../models/Deposit");

const summary = async (req, res) => {
  try {
    const userId = req.user.id;
    const aggregation = await Deposit.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const result = aggregation.reduce(
      (acc, item) => {
        acc[item._id] = {
          count: item.count,
          totalAmount: item.totalAmount,
        };
        return acc;
      },
      {}
    );

    return res.status(200).json({
      ok: true,
      summary: {
        locked: result.LOCKED || { count: 0, totalAmount: 0 },
        matured: result.MATURED || { count: 0, totalAmount: 0 },
        released: result.RELEASED || { count: 0, totalAmount: 0 },
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  summary,
};

/**
 * FILE ROLE:
 * Builds dashboard summaries for a user's deposits by state.
 *
 * CONNECTS TO:
 * - models/Deposit (aggregation)
 *
 * USED BY:
 * - GET /api/dashboard/summary
 *
 * NOTES:
 * - Pure read-only aggregation; does not mutate state.
 */
