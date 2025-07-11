const express = require('express');
const router = express.Router();
const { validateRequest } = require('../utils/validation');
const { getAllOrders, getOrderById, updateOrder } = require('../controllers/orderController');
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


// PATCH /orders/:orderId
router.patch(
  '/:orderId',
  validateRequest([
    param('orderId').isMongoId().withMessage('Invalid order ID'),
    body('status').optional().isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
    body('shippingAddress').optional().isObject()
  ]),
  updateOrder
);


module.exports = router;



/*// POST /orders/:orderId/reroute
router.post(
  '/:orderId/reroute',
  validateRequest([
    param('orderId').isMongoId().withMessage('Invalid order ID'),
    body('warehouseId').isMongoId().withMessage('Invalid warehouse ID')
  ]),
  rerouteOrder
);*/



