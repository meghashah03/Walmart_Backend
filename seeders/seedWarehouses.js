const Warehouse = require('../models/warehouse');

const seedWarehouses = async () => {
  try {
    await Warehouse.deleteMany(); // Clear old data

    const warehouses = [
      {
        name: "Delhi Fulfillment Center",
        address: {
          street: "Plot 29, Industrial Area",
          city: "New Delhi",
          state: "Delhi",
          zip: "110020",
          country: "India"
        },
        capacity: 10000,
        type: "warehouse",
        contact: {
          phone: "+91-9876543210",
          email: "contact-delhi@walmart.in"
        },
        location: {
          latitude: 28.6139,
          longitude: 77.2090
        }
      },
      {
        name: "Mumbai Dark Store",
        address: {
          street: "Unit 501, Logistics Park",
          city: "Mumbai",
          state: "Maharashtra",
          zip: "400072",
          country: "India"
        },
        capacity: 6000,
        type: "dark_store",
        contact: {
          phone: "+91-9823456789",
          email: "contact-mumbai@walmart.in"
        },
        location: {
          latitude: 19.0760,
          longitude: 72.8777
        }
      }
    ];

    await Warehouse.insertMany(warehouses);
    console.log("Warehouses seeded successfully");
  } catch (error) {
    console.error("Error seeding warehouses:", error);
    throw error;
  }
};

module.exports = seedWarehouses;
