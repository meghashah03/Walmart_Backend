const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Create new feedback (Public)
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all feedback (Admin)
router.get('/', async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.json(allFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update feedback (Admin) — mark as checked, or update likes/dislikes
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
