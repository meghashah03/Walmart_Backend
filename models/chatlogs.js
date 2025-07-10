const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('ChatLog', chatLogSchema);
