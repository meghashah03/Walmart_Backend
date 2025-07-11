const Inventory = require('../models/inventory');
const Product = require('../models/product');


exports.getAllInventory = async (req, res, next) => {
  try {
    const { sku, warehouseId } = req.query;

    const filter = {};

    if (sku) {
      
      const product = await Product.findOne({ sku: sku });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      filter.sku = product._id;
    }

    if (warehouseId) {
      filter.warehouseId = warehouseId;
    }

    const inventory = await Inventory.find(filter)
      .populate('sku', 'sku name') 
      .populate('warehouseId', 'name address');

    res.status(200).json({
      count: inventory.length,
      inventory
    });
  } catch (error) {
    next(error);
  }
};


exports.getInventoryBySKU = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await Product.findOne({ sku });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const inventory = await Inventory.find({ sku: product._id })
      .populate('warehouseId', 'name address')
      .select('availableQuantity reservedQuantity lastUpdated warehouseId');

    res.status(200).json({
      sku: product.sku,
      productName: product.name,
      stock: inventory
    });
  } catch (error) {
    next(error);
  }
};
