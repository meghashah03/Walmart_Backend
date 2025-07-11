const express = require('express');
const { query, param, validationResult } = require('express-validator');
const {
  getAllInventory,
  getInventoryBySKU
} = require('../controllers/inventoryController');

const router = express.Router();

// Validation middleware
const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


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
