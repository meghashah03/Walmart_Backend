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

    if (users.length < 2 || products.length < 2 || warehouses.length < 2) {
      throw new Error('Not enough users, products, or warehouses to create sample orders.');
    }

    // Safety: fallbacks in case user has no address
    const getAddress = (user) =>
      user.addresses?.[0] || {
        label: 'Default',
        street: '123 Fallback St',
        city: 'Fallback City',
        state: 'Fallback State',
        zip: '00000',
        country: 'Fallback Country',
      };

    const orders = [
      {
        customerId: users[0]._id,
        orderDate: new Date(),
        status: 'Processing',
        items: [
          {
            sku: products[0]._id,
            quantity: 2,
            priceAtOrder: products[0].price.amount,
          },
          {
            sku: products[1]._id,
            quantity: 1,
            priceAtOrder: products[1].price.amount,
          },
        ],
        totalAmount:
          products[0].price.amount * 2 + products[1].price.amount * 1,
        shippingAddress: getAddress(users[0]),
        fulfillment: {
          warehouseId: warehouses[0]._id,
        },
      },
      {
        customerId: users[1]._id,
        orderDate: new Date(),
        status: 'Pending',
        items: [
          {
            sku: products[1]._id,
            quantity: 3,
            priceAtOrder: products[1].price.amount,
          },
        ],
        totalAmount: products[1].price.amount * 3,
        shippingAddress: getAddress(users[1]),
        fulfillment: {
          warehouseId: warehouses[1]._id,
        },
      },
    ];

    await Order.insertMany(orders);
    console.log('Orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
    throw error;
  }
};

module.exports = seedOrders;

