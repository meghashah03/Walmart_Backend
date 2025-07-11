const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/validation');
const { getAllOrders, getOrderById } = require('../controllers/orderController');
const { query, param } = require('express-validator');




// GET /orders
router.get(
  '/',
  validateRequest([
    query('status').optional().isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
    query('customerId').optional().isMongoId().withMessage('Invalid customerId'),
    query('from').optional().isISO8601().toDate(),
    query('to').optional().isISO8601().toDate()
  ]),
  getAllOrders
);

// GET /orders/:orderId
router.get(
  '/:orderId',
  validateRequest([
    param('orderId').isMongoId().withMessage('Invalid order ID')
  ]),
  getOrderById
);

module.exports = router;


