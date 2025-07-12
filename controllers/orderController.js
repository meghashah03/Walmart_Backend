const Order = require('../models/order');
const mongoose = require('mongoose');

const Product = require('../models/product');

const Warehouse = require('../models/warehouse');


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
      
      if (from) filter.orderDate.$gte = from;
      if (to) filter.orderDate.$lte = to;
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


// PATCH /orders/:orderId
exports.updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const updates = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const originalStatus = order.status;

    if (updates.status) order.status = updates.status;
    if (updates.shippingAddress) order.shippingAddress = updates.shippingAddress;

    const updatedOrder = await order.save();

    const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Save order and update stock within transaction
    await order.save({ session });
    
    if (updates.status === 'Shipped') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.sku,
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }
    } else if (updates.status === 'Cancelled') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.sku,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }
    }
    
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

    // Notify Assistant (stub)
    if (['Shipped', 'Cancelled'].includes(updates.status)) {
      console.log(`Notify Assistant: Order ${orderId} is now ${updates.status}`);
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};






/*// POST /orders/:orderId/reroute
exports.rerouteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { warehouseId } = req.body;

    if (!warehouseId) {
      return res.status(400).json({ message: 'warehouseId is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const newWarehouse = await Warehouse.findById(warehouseId);
    if (!newWarehouse) {
      return res.status(404).json({ message: 'Target warehouse not found' });
    }

    const previousWarehouseId = order.fulfillment?.warehouseId;

    // Update warehouse in order
    order.fulfillment.warehouseId = warehouseId;
    await order.save();

    // Optional: Release from old warehouse (mock logic)
    if (previousWarehouseId) {
      console.log(`Releasing inventory from warehouse ${previousWarehouseId}`);
      // implement actual logic if needed
    }

    // Optional: Reserve stock in new warehouse (mock logic)
    console.log(`Reserving inventory at warehouse ${warehouseId}`);
    // implement actual logic if needed

    res.status(200).json({
      message: `Order ${orderId} successfully rerouted to warehouse ${warehouseId}`,
      order
    });
  } catch (err) {
    next(err);
  }
};*/
