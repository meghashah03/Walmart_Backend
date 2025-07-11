const express = require('express');
const { check, param, query, validationResult } = require('express-validator');
const router = express.Router();
const {
  getAllProducts,
  getProductBySKU
} = require('../controllers/productController');


const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


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

