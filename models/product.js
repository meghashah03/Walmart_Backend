const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true }
}, { _id: false });

const manufactureDetailSchema = new Schema({
    modelNumber: { type: String },
    releaseDate: { type: Date }
  }, { _id: false });

const dimensionSchema = new Schema({
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  }, { _id: false });
  
const shippingDetailSchema = new Schema({
    weightKg: { type: Number },
    dimensionCm: dimensionSchema
  }, { _id: false });

const variantSchema = new Schema({
    sku: { type: String, required: true },
    price: priceSchema
  }, { _id: false });

//main schema for product
const productSchema = new Schema({
    sku: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    categories: [{ type: String }],
    images: [{ type: String }], // URLs
    price: priceSchema,
    manufactureDetails: manufactureDetailSchema,
    shippingDetail: shippingDetailSchema,
    stockKeepingUnit: { type: String },
    brand: { type: String },
    variants: [variantSchema]
});

module.exports = mongoose.model('Product', productSchema);

