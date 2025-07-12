// quickCount.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user');
const Product = require('./models/product');
const Warehouse = require('./models/warehouse');
const connectDB = require('./config/db');

(async () => {
  await connectDB();

  const userCount = await User.countDocuments();
  const productCount = await Product.countDocuments();
  const warehouseCount = await Warehouse.countDocuments();

  console.log('Users:', userCount);
  console.log('Products:', productCount);
  console.log('Warehouses:', warehouseCount);

  process.exit(0);
})();
