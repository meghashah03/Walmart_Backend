const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const seedUsers = require('./seedUsers');
const seedProducts = require('./seedProducts');
const seedWarehouses = require('./seedWarehouses');
const seedInventory = require('./seedInventory');
const seedOrders = require('./seedOrders');
const seedDeliveries = require('./seedDeliveries');
const seedMetrics = require('./seedMetrics');
const seedForecast = require('./seedForecast');
const seedChatLog = require('./seedChatLog');
const seedAlerts = require('./seedAlerts');
const seedFeedback = require('./seedFeedback');

dotenv.config();

const runSeeders = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    console.log('MongoDB Connected');

    console.log('seedUsers typeof:', typeof seedUsers);
    if (typeof seedUsers !== 'function') {
      throw new Error('seedUsers is not a function. Check your export.');
    }

    console.log('Running seedUsers...');
    await seedUsers();
    await seedProducts();
    await seedWarehouses();
    await seedInventory(); 
    await seedOrders();
    await seedDeliveries();
    await seedMetrics();
    await seedForecast(); 
    await seedChatLog();
    await seedAlerts();
    await seedFeedback();


    console.log('seedUsers completed');
    console.log('All seeders completed!');

    
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err.message);
    process.exit(1);
  }
};

runSeeders();



