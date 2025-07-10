const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  sku: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  availableQuantity: { type: Number, required: true },
  reservedQuantity: { type: Number, default: 0 },
  reorderPoint: { type: Number },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);

