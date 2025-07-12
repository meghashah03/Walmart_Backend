const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const Inventory = require('../models/inventory');
const Warehouse = require('../models/warehouse');

// GET /orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, customerId, from, to } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (customerId) filter.customerId = customerId;
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

// POST /orders
exports.createOrder = async (req, res, next) => {
  try {
    const { customerId, items, shippingAddress } = req.body;

    if (!customerId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    let totalAmount = 0;
    const finalItems = [];
    let assignedWarehouse = null;

    for (const item of items) {
      const product = await Product.findById(item.sku);
      if (!product) return res.status(404).json({ error: `Product ${item.sku} not found` });

      const priceAtOrder = product.price.amount;
      totalAmount += priceAtOrder * item.quantity;

      const inventories = await Inventory.find({ sku: product._id }).sort({ availableQuantity: -1 });

      const inventory = inventories.find(inv => inv.availableQuantity >= item.quantity);
      if (!inventory) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.sku}` });
      }

      inventory.availableQuantity -= item.quantity;
      inventory.reservedQuantity += item.quantity;
      await inventory.save();

      finalItems.push({ sku: product._id, quantity: item.quantity, priceAtOrder });

      // Use the first suitable warehouse
      if (!assignedWarehouse) {
        assignedWarehouse = inventory.warehouseId;
      }
    }

    const order = new Order({
      customerId,
      items: finalItems,
      totalAmount,
      shippingAddress,
      fulfillment: {
        warehouseId: assignedWarehouse,
        deliveryId: new mongoose.Types.ObjectId()
      }
    });

    const savedOrder = await order.save();

    res.status(201).json({
      orderId: savedOrder._id,
      status: savedOrder.status,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });
  } catch (error) {
    console.error('Error creating order:', error);
    next(error);
  }
};