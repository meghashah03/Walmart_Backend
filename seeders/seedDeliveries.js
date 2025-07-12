const Delivery = require('../models/deliveries');
const Order = require('../models/order');

const seedDeliveries = async () => {
  try {
    await Delivery.deleteMany();

    const orders = await Order.find();

    if (orders.length === 0) {
      throw new Error('No orders found to create deliveries');
    }

    const deliveries = orders.map((order, index) => {
      const now = new Date();
      const delayReason = index % 2 === 0 ? null : 'Traffic congestion';

      return {
        orderId: order._id,
        assignedDriver: `Driver-${100 + index}`,
        status: index % 3 === 0 ? 'Delivered' : 'EnRoute',
        scheduledStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hrs ago
        estimatedArrival: new Date(now.getTime() + 30 * 60 * 1000), // in 30 mins
        actualArrival: index % 3 === 0 ? now : null,
        delayReason: delayReason,
        route: [
          { latitude: 28.6139, longitude: 77.2090 }, // Delhi
          { latitude: 28.5355, longitude: 77.3910 }  // Noida
        ],
        trafficUpdates: [
          {
            timestamp: new Date(),
            note: delayReason || 'On time'
          }
        ]
      };
    });

    await Delivery.insertMany(deliveries);
    console.log('Deliveries seeded successfully');
  } catch (error) {
    console.error('Error seeding deliveries:', error.message);
    throw error;
  }
};

module.exports = seedDeliveries;
