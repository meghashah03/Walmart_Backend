const Inventory = require('../models/inventory');
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');

const seedInventory = async () => {
  try {
    await Inventory.deleteMany(); // Clear old inventory

    // Fetch the products and warehouses seeded earlier
    const products = await Product.find({});
    const warehouses = await Warehouse.find({});

    if (products.length === 0 || warehouses.length === 0) {
      throw new Error("Products or Warehouses not found. Seed them first.");
    }

    // Create inventory entries for combinations of product & warehouse
    const inventoryItems = [
      {
        sku: products[0]._id, // e.g. TEST-001
        warehouseId: warehouses[0]._id, // e.g. Delhi Fulfillment Center
        availableQuantity: 100,
        reservedQuantity: 10,
        reorderPoint: 20
      },
      {
        sku: products[1]._id, // e.g. TEST-002
        warehouseId: warehouses[1]._id, // e.g. Mumbai Dark Store
        availableQuantity: 50,
        reservedQuantity: 5,
        reorderPoint: 15
      },
      {
        sku: products[0]._id, // TEST-001 in another warehouse
        warehouseId: warehouses[1]._id,
        availableQuantity: 30,
        reservedQuantity: 3,
        reorderPoint: 10
      }
    ];

    await Inventory.insertMany(inventoryItems);
    console.log("Inventory seeded successfully");
  } catch (error) {
    console.error("Error seeding inventory:", error);
    throw error;
  }
};

module.exports = seedInventory;
