const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const warehouseSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    _id: false
  },
  capacity: { type: Number },
  type: { type: String, enum: ['warehouse', 'dark_store'], required: true },
  contact: {
    phone: { type: String },
    email: { type: String },
    _id: false
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    _id: false
  }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);

