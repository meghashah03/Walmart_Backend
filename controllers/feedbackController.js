const Feedback = require('../models/feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update feedback (like, dislike, check)
exports.updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
   if (!updated) {
      return res.status(404).json({ message: 'Feedback not found' });
   }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
