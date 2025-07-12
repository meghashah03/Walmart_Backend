const Alert = require('../models/alert');
const Order = require('../models/order');
const Inventory = require('../models/inventory');
const Delivery = require('../models/deliveries');

const seedAlerts = async () => {
  try {
    await Alert.deleteMany(); // Clear old alerts

    const sampleInventory = await Inventory.findOne();
    const sampleOrder = await Order.findOne();
    const sampleDelivery = await Delivery.findOne();

    if (!sampleInventory || !sampleOrder || !sampleDelivery) {
      throw new Error('Not enough data to seed alerts. Make sure orders, deliveries, and inventory exist.');
    }

    const dummyAlerts = [
      {
        type: 'StockoutRisk',
        relatedId: sampleInventory._id,
        message: 'Inventory level is below reorder point.',
        status: 'New'
      },
      {
        type: 'LateDelivery',
        relatedId: sampleDelivery._id,
        message: 'Delivery is running behind schedule.',
        status: 'Acknowledged'
      },
      {
        type: 'Anomaly',
        relatedId: sampleOrder._id,
        message: 'Order flagged due to unusual quantity.',
        status: 'New'
      }
    ];

    await Alert.insertMany(dummyAlerts);
    console.log('Alerts seeded successfully');
  } catch (error) {
    console.error('Error seeding alerts:', error.message);
    throw error;
  }
};

module.exports = seedAlerts;
