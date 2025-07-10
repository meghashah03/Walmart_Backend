const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String }
}, { _id: false });

const contactSchema = new Schema({
  phone: { type: String },
  email: { type: String }
}, { _id: false });

const locationSchema = new Schema({
  latitude: { type: Number },
  longitude: { type: Number }
}, { _id: false });

const warehouseSchema = new Schema({
  name: { type: String, required: true },
  address: addressSchema,
  capacity: { type: Number },
  type: { type: String, enum: ['warehouse', 'dark_store'], required: true },
  contact: contactSchema,
  location: locationSchema
});

module.exports = mongoose.model('Warehouse', warehouseSchema);

