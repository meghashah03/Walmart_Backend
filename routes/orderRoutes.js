


const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/validation');
const { getAllOrders, getOrderById, createOrder } = require('../controllers/orderController');
const { query, param, body } = require('express-validator');

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

// POST /orders

  router.post('/', 
  validateRequest([
    body('customerId').notEmpty().isMongoId().withMessage('Invalid customer ID'),
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.sku').notEmpty().isMongoId().withMessage('Item SKU must be a valid ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('shippingAddress').notEmpty().withMessage('Shipping address is required')
  ]),
  createOrder
);

module.exports = router;



