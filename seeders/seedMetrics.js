const Metrics = require('../models/metrics');

const seedMetrics = async () => {
  try {
    await Metrics.deleteMany();

    const today = new Date();
    const daysToSeed = 14;
    const metrics = [];

    for (let i = 0; i < daysToSeed; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      metrics.push({
        date: date,
        orderFillRate: Math.floor(Math.random() * 11) + 85,           // 85–95%
        forecastAccuracy: Math.floor(Math.random() * 21) + 75,        // 75–95%
        stockoutRate: parseFloat((Math.random() * 5).toFixed(2)),     // 0–5%
        onTimeDeliveryRate: Math.floor(Math.random() * 16) + 80,      // 80–95%
        orderCycleTime: parseFloat((Math.random() * 2 + 1).toFixed(2)) // 1–3 days
      });
    }

    await Metrics.insertMany(metrics);
    console.log('Metrics seeded successfully');
  } catch (error) {
    console.error('Error seeding metrics:', error.message);
    throw error;
  }
};

module.exports = seedMetrics;
