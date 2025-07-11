
const { validationResult } = require('express-validator');

const validateRequest = (validations) => async (req, res, next) => {
  try {
  await Promise.all(validations.map((v) => v.run(req)));
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    next();
  } catch (error) {
    console.error('Validation execution error:', error);
    return res.status(500).json({ error: 'Internal validation error' });
  }
};
module.exports = { validateRequest };