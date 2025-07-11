const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    sku: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    categories: [{ type: String }],
    images: [{ type: String }], // URLs
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      _id:false
    },
    manufactureDetails: {
      modelNumber: { type: String },
      releaseDate: { type: Date },
      _id: false
    },
    shippingDetail: {
      weightKg: { type: Number },
      dimensionCm: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
        _id:false
      },
      _id:false
    },
    stockKeepingUnit: { type: String },
    brand: { type: String },
    variants: [{
      sku: { type: String, required: true },
      price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        _id:false
      },
      _id:false
    }]
});

module.exports = mongoose.model('Product', productSchema);

