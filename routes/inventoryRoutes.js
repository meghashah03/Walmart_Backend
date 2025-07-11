const express = require('express');
const { query, param, validationResult } = require('express-validator');
const { validateRequest } = require('../utils/validation');
const {
  getAllInventory,
  getInventoryBySKU
} = require('../controllers/inventoryController');

const router = express.Router();




router.get(
  '/',
  validateRequest([
    query('sku').optional().isString().withMessage('SKU must be a string'),
    query('warehouseId').optional().isMongoId().withMessage('Invalid warehouse ID')
  ]),
  getAllInventory
);


router.get(
  '/:sku',
  validateRequest([
    param('sku').notEmpty().withMessage('SKU is required')
  ]),
  getInventoryBySKU
);

module.exports = router;
