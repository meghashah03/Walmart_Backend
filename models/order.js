const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  priceAtOrder: { type: Number, required: true }
}, { _id: false });

const addressSchema = new Schema({
  label: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String }
}, { _id: false });

// const billingInfoSchema = new Schema({
//   method: { type: String },
//   last4: { type: String }
// }, { _id: false });

const fulfillmentSchema = new Schema({
  warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
  deliveryId: { type: Schema.Types.ObjectId }
}, { _id: false });

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled','Fulfilled'], default: 'Pending' },
  items: [itemSchema],
  totalAmount: { type: Number, required: true },
  shippingAddress: addressSchema,
 // billingInfo: billingInfoSchema,
  fulfillment: fulfillmentSchema,
  fulfillmentDate: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);

