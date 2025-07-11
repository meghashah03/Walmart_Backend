const express = require('express');
const { check, param, query, validationResult } = require('express-validator');
const router = express.Router();
const { validateRequest } = require('../utils/validation');
const {
  getAllProducts,
  getProductBySKU
} = require('../controllers/productController');





router.get(
  '/',
  validateRequest([
    query('category').optional().isString(),
    query('search').optional().isString(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
    query('sort').optional().matches(/^[a-zA-Z]+:(asc|desc)$/)
  ]),
  getAllProducts
);


router.get(
  '/:sku',
  validateRequest([
    param('sku').isString().withMessage('SKU must be a valid string'),
  ]),
  getProductBySKU
);

module.exports = router;

