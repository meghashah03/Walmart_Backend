const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routePointSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
  //eta: { type: Date }
}, { _id: false });

const trafficUpdateSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  note: { type: String }
}, { _id: false });

const deliverySchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  assignedDriver: { type: String },
  status: { type: String, enum: ['Scheduled', 'EnRoute', 'Delivered', 'Failed'], default: 'Scheduled' },
  scheduledStart: { type: Date },
  estimatedArrival: { type: Date },
  actualArrival: { type: Date },
  delayReason: { type: String },
  route: [routePointSchema],
  trafficUpdates: [trafficUpdateSchema]
});

module.exports = mongoose.model('Delivery', deliverySchema);

