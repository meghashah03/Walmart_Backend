const Forecast = require('../models/forecast');
const Product = require('../models/product');

const seedForecast = async () => {
  try {
    await Forecast.deleteMany();

    const products = await Product.find();
    if (!products.length) throw new Error('No products found for forecasting.');

    const forecastDocs = [];
    const today = new Date();
    const forecastDays = 14;

    for (const product of products) {
      for (let i = 0; i < forecastDays; i++) {
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + i);

        forecastDocs.push({
          sku: product._id,
          date: forecastDate,
          predictedQuantity: Math.floor(Math.random() * 50) + 10, // Random 10–60
          modelVersion: 'v1.0-mock',
          generatedAt: new Date()
        });
      }
    }

    await Forecast.insertMany(forecastDocs);
    console.log('Forecasts seeded successfully');
  } catch (error) {
    console.error('Error seeding forecasts:', error.message);
    throw error;
  }
};

module.exports = seedForecast;
