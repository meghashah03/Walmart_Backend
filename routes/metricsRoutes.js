const express = require('express');
const router = express.Router();
const { getMetrics } = require('../controllers/metricsController');
const { query } = require('express-validator');
const { validateRequest } = require('../utils/validation');

router.get(
  '/',
  validateRequest([
    query('from').optional().isISO8601().toDate(),
    query('to').optional().isISO8601().toDate()
  ]),
  getMetrics
);

module.exports = router;
