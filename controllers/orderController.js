const Order = require('../models/order');
const mongoose = require('mongoose');

// GET /orders?status=Delivered&customerId=...&from=...&to=...
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, customerId, from, to } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

     if (customerId) {
      filter.customerId = customerId;
    }

    if (from || to) {
      filter.orderDate = {};
      if (from) filter.orderDate.$gte = new Date(from);
      if (to) filter.orderDate.$lte = new Date(to);
    }

    const orders = await Order.find(filter)
      .populate('customerId', 'name email')
      .populate('items.sku', 'sku name price')
      .populate('fulfillment.warehouseId', 'name address');

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// GET /orders/:orderId
exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    
np
    const order = await Order.findById(orderId)
      .populate('customerId', 'name email')
      .populate('items.sku', 'sku name price')
      .populate('fulfillment.warehouseId', 'name address');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
