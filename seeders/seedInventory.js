const Inventory = require('../models/inventory');
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');

const seedInventory = async () => {
  try {
    await Inventory.deleteMany(); // Clear old inventory

    // Fetch the products and warehouses seeded earlier
    const products = await Product.find({});
    const warehouses = await Warehouse.find({});

    if (products.length < 2 || warehouses.length < 2) {
      throw new Error("At least 2 products and 2 warehouses are required. Seed them first.");
   }

    // Create inventory entries for combinations of product & warehouse
    const inventoryItems = [];
    const baseQuantities = [
      { available: 100, reserved: 10, reorder: 20 },
      { available: 50, reserved: 5, reorder: 15 },
      { available: 30, reserved: 3, reorder: 10 }
    ];
    
    let quantityIndex = 0;
    for (let i = 0; i < Math.min(2, products.length); i++) {
      for (let j = 0; j < warehouses.length; j++) {
        if (quantityIndex < baseQuantities.length) {
         const qty = baseQuantities[quantityIndex];
          inventoryItems.push({
           sku: products[i]._id,
           warehouseId: warehouses[j]._id,
            availableQuantity: qty.available,
            reservedQuantity: qty.reserved,
           reorderPoint: qty.reorder
          });
          quantityIndex++;
        }
      }
    }

    await Inventory.insertMany(inventoryItems);
    console.log("Inventory seeded successfully");
  } catch (error) {
    console.error("Error seeding inventory:", error);
    throw error;
  }
};

module.exports = seedInventory;
