const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alertSchema = new Schema({
    type: { type: String, enum: ['StockoutRisk', 'LateDelivery', 'Anomaly'], required: true },
    relatedId: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'Acknowledged', 'Resolved'], default: 'New' },
    createdAt: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model('Alert', alertSchema); 