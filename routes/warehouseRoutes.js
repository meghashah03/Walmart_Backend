const express = require('express');
const { query, param, validationResult } = require('express-validator');
const { validateRequest } = require('../utils/validation');
const {
  getAllWarehouses,
  getWarehouseById
} = require('../controllers/warehouseController');

const router = express.Router();




/**
 * @route   GET /warehouses
 * @desc    Get all warehouses or dark stores (with optional filters)
 * @query   city (optional), type (optional: 'warehouse' or 'dark_store')
 */
router.get(
  '/',
  validateRequest([
    query('city').optional().isString().withMessage('City must be a string'),
    query('type').optional().isIn(['warehouse', 'dark_store']).withMessage('Type must be warehouse or dark_store')
  ]),
  getAllWarehouses
);

/**
 * @route   GET /warehouses/:id
 * @desc    Get warehouse by MongoDB ID
 */
router.get(
  '/:id',
  validateRequest([
    param('id').isMongoId().withMessage('Invalid warehouse ID')
  ]),
  getWarehouseById
);

module.exports = router;
