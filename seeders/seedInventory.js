const Inventory = require('../models/inventory');
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');

const seedInventory = async () => {
  try {
    await Inventory.deleteMany(); // Clear old inventory

    const products = await Product.find({});
    const warehouses = await Warehouse.find({});

    if (products.length === 0 || warehouses.length === 0) {
      throw new Error('Products and Warehouses must be seeded before inventory.');
    }

    const quantityTemplates = [
      { available: 100, reserved: 10, reorder: 20 },
      { available: 50, reserved: 5, reorder: 15 },
      { available: 30, reserved: 3, reorder: 10 },
      { available: 70, reserved: 7, reorder: 12 },
      { available: 120, reserved: 12, reorder: 25 }
    ];

    const inventoryItems = [];

    products.forEach((product, pIndex) => {
      warehouses.forEach((warehouse, wIndex) => {
        const template = quantityTemplates[(pIndex + wIndex) % quantityTemplates.length];
        inventoryItems.push({
          sku: product._id,
          warehouseId: warehouse._id,
          availableQuantity: template.available,
          reservedQuantity: template.reserved,
          reorderPoint: template.reorder
        });
      });
    });

    await Inventory.insertMany(inventoryItems);
    console.log('Inventory seeded successfully');
  } catch (error) {
    console.error('Error seeding inventory:', error.message);
    throw error;
  }
};

module.exports = seedInventory;

