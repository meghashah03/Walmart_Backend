const Metrics = require('../models/metrics');

// GET /metrics 
exports.getMetrics = async (req, res, next) => {
  try {
    // Optional query: ?from=2024-01-01&to=2024-12-31
    const { from, to } = req.query;
    const filter = {};

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const metrics = await Metrics.find(filter).sort({ date: -1 });

    const latest = metrics[0]; // most recent snapshot

    res.status(200).json({
      kpis: {
        orderFillRate: latest?.orderFillRate ?? null,
        forecastAccuracy: latest?.forecastAccuracy ?? null,
        stockoutRate: latest?.stockoutRate ?? null,
        onTimeDeliveryRate: latest?.onTimeDeliveryRate ?? null,
        orderCycleTime: latest?.orderCycleTime ?? null
      },
      trend: metrics.reverse() // for charting in frontend
    });
  } catch (err) {
    next(err);
  }
};
