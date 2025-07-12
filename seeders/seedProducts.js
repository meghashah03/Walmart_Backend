const Product = require('../models/product');

const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing

    const dummyProducts = [
      {
        sku: 'TEST-001',
        name: 'EcoSmart LED Bulb',
        description: 'An energy-efficient LED bulb with smart features.',
        categories: ['Electronics', 'Home Improvement'],
        images: [
          'https://example.com/images/bulb1.jpg',
          'https://example.com/images/bulb2.jpg'
        ],
        price: {
          amount: 499,
          currency: 'INR'
        },
        manufactureDetails: {
          modelNumber: 'ES-LED-100',
          releaseDate: new Date('2024-02-01')
        },
        shippingDetail: {
          weightKg: 0.2,
          dimensionCm: {
            length: 10,
            width: 6,
            height: 6
          }
        },
        stockKeepingUnit: 'SKU-LED-001',
        brand: 'EcoSmart',
        variants: [
          {
            sku: 'TEST-001-WHITE',
            price: {
              amount: 499,
              currency: 'INR'
            }
          },
          {
            sku: 'TEST-001-WARM',
            price: {
              amount: 549,
              currency: 'INR'
            }
          }
        ]
      },
      {
        sku: 'TEST-002',
        name: 'Smart Plug Socket',
        description: 'WiFi-enabled smart plug for automation.',
        categories: ['Electronics', 'Smart Home'],
        images: [
          'https://example.com/images/plug1.jpg'
        ],
        price: {
          amount: 899,
          currency: 'INR'
        },
        manufactureDetails: {
          modelNumber: 'SP-IND-22',
          releaseDate: new Date('2023-12-15')
        },
        shippingDetail: {
          weightKg: 0.3,
          dimensionCm: {
            length: 8,
            width: 8,
            height: 5
          }
        },
        stockKeepingUnit: 'SKU-PLUG-002',
        brand: 'SmartHome',
        variants: [
          {
            sku: 'TEST-002-10A',
            price: {
              amount: 899,
              currency: 'INR'
            }
          },
          {
            sku: 'TEST-002-16A',
            price: {
              amount: 1099,
              currency: 'INR'
            }
          }
        ]
      }
    ];

    const result = await Product.insertMany(dummyProducts);
    console.log('Products seeded successfully');
    return result; // For linking in inventory
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

module.exports = seedProducts;
