const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  items: [
    {
      sku: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      priceAtOrder: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    label: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },
  billingInfo: {
    method: { type: String },
    //last4: { type: String }
  },
  fulfillment: {
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    deliveryId: { type: Schema.Types.ObjectId }
  }
});

module.exports = mongoose.model('Order', orderSchema);

