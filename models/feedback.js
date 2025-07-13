const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  messageCount: { type: Number, default: 0 },
  feedback: { type: String, required: true },
  email: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['bug',
  'feature',
  'ui',
  'performance',
  'other',
  'praise',
  'complaint',
  'feature_request'], 
    required: true 
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  isChecked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
