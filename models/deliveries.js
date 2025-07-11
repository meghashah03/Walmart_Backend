const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const deliverySchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  assignedDriver: { type: String },
  status: { type: String, enum: ['Scheduled', 'EnRoute', 'Delivered', 'Failed'], default: 'Scheduled' },
  scheduledStart: { type: Date },
  estimatedArrival: { type: Date },
  actualArrival: { type: Date },
  delayReason: { type: String },
  route: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      _id:false
    }
  ],
  trafficUpdates: [
    { 
      timestamp: { type: Date, default: Date.now },
      note: { type: String },
      _id:false
    }
  ]
});

module.exports = mongoose.model('Delivery', deliverySchema);

