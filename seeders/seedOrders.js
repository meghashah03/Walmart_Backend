const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');

const seedOrders = async () => {
  try {
    await Order.deleteMany();

    const users = await User.find({});
    const products = await Product.find({});
    const warehouses = await Warehouse.find({});

    if (users.length < 2 || products.length < 2 || warehouses.length < 1) {
      throw new Error('Not enough users, products, or warehouses to create sample orders.');
    }

    const getAddress = (user) =>
      user.addresses?.[0] || {
        label: 'Default',
        street: '123 Fallback St',
        city: 'Fallback City',
        state: 'Fallback State',
        zip: '00000',
        country: 'Fallback Country',
      };

    const statuses = ['Fulfilled', 'Processing', 'Pending', 'Cancelled'];
    const orders = [];

    for (let i = 0; i < 20; i++) {
      const user = users[i % users.length];
      const warehouse = warehouses[i % warehouses.length];

      // Pick 1–2 random products per order
      const itemCount = Math.floor(Math.random() * 2) + 1;
      const items = [];

      let totalAmount = 0;
      for (let j = 0; j < itemCount; j++) {
        const product = products[(i + j) % products.length];
        const quantity = Math.floor(Math.random() * 5) + 1;

        items.push({
          sku: product._id,
          quantity,
          priceAtOrder: product.price.amount,
        });

        totalAmount += product.price.amount * quantity;
      }

      const status = statuses[i % statuses.length];

      const order = {
        customerId: user._id,
        orderDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // staggered dates
        status,
        items,
        totalAmount,
        shippingAddress: getAddress(user),
        fulfillment: {
          warehouseId: warehouse._id,
        },
      };

      if (status === 'Fulfilled') {
         order.fulfillmentDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      }

      orders.push(order);
    }

    await Order.insertMany(orders);
    console.log('orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error.message);
    throw error;
  }
};

module.exports = seedOrders;



