const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  label: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String }
}, { _id: false });

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  roles: [{ type: String }],
  phone: { type: String },
  addresses: [addressSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);



