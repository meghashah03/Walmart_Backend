const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forecastSchema = new Schema({
  sku: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  date: { type: Date, required: true },
  predictedQuantity: { type: Number, required: true },
  modelVersion: { type: String },
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Forecast', forecastSchema);

