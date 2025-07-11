const express = require('express');
const router = express.Router();
const { query, param, body } = require('express-validator');
const { validateRequest } = require('../utils/validation');
const { getAllDeliveries, getDeliveryById, scheduleDelivery, updateDelivery } = require('../controllers/deliveryController');

router.get(
  '/',
  validateRequest([
    query('status').optional().isIn(['Scheduled', 'EnRoute', 'Delivered', 'Failed']),
    query('assignedDriver').optional().isString(),
    query('from').optional().isISO8601().toDate(),
    query('to').optional().isISO8601().toDate()
  ]),
  getAllDeliveries
);


router.get(
  '/:deliveryId',
  validateRequest([
    param('deliveryId').isMongoId().withMessage('Invalid delivery ID')
  ]),
  getDeliveryById
);


router.post(
    '/',
    validateRequest([
      body('orderId').notEmpty().withMessage('orderId is required'),
      body('origin').notEmpty().withMessage('origin is required'),
      body('destination').notEmpty().withMessage('destination is required'),
      body('deliveryWindow').isISO8601().withMessage('Valid deliveryWindow is required'),
      body('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high')
    ]),
    scheduleDelivery
  );

  //PATCH /deliveries/:deliveryId
  router.patch(
    '/:deliveryId',
    validateRequest([
      param('deliveryId').isMongoId().withMessage('Invalid delivery ID'),
      body('status').optional().isIn(['Scheduled', 'EnRoute', 'Delivered', 'Failed']),
      body('location.latitude').optional().isFloat({ min: -90, max: 90 }),
      body('location.longitude').optional().isFloat({ min: -180, max: 180 }),
      body('delayReason').optional().isString(),
      body('trafficNote').optional().isString()
    ]),
    updateDelivery
  );
  
module.exports = router;
