const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metricSchema = new Schema({
  date: { type: Date, required: true },
  orderFillRate: { type: Number },
  forecastAccuracy: { type: Number },
  stockoutRate: { type: Number },
  onTimeDeliveryRate: { type: Number },
  orderCycleTime: { type: Number },
  //sku: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
});

module.exports = mongoose.model('Metrics', metricSchema);
