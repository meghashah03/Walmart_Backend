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
      },
      // Additional 10+ products for variety
      {
        sku: 'TEST-003',
        name: 'Portable Bluetooth Speaker',
        description: 'Compact speaker with high bass and long battery life.',
        categories: ['Electronics', 'Audio'],
        images: ['https://example.com/images/speaker.jpg'],
        price: { amount: 1299, currency: 'INR' },
        manufactureDetails: { modelNumber: 'BT-SPK-01', releaseDate: new Date('2023-08-01') },
        shippingDetail: { weightKg: 0.5, dimensionCm: { length: 12, width: 8, height: 8 } },
        stockKeepingUnit: 'SKU-SPK-003',
        brand: 'SoundWave',
        variants: []
      },
      {
        sku: 'TEST-004',
        name: 'Wireless Mouse',
        description: 'Ergonomic mouse with adjustable DPI.',
        categories: ['Electronics', 'Accessories'],
        images: ['https://example.com/images/mouse.jpg'],
        price: { amount: 699, currency: 'INR' },
        manufactureDetails: { modelNumber: 'MS-WL-10', releaseDate: new Date('2024-01-10') },
        shippingDetail: { weightKg: 0.1, dimensionCm: { length: 10, width: 6, height: 4 } },
        stockKeepingUnit: 'SKU-MSE-004',
        brand: 'ClickPro',
        variants: []
      },
      {
        sku: 'TEST-005',
        name: 'USB-C Charger 20W',
        description: 'Fast charger with overcurrent protection.',
        categories: ['Electronics', 'Charging'],
        images: ['https://example.com/images/charger.jpg'],
        price: { amount: 599, currency: 'INR' },
        manufactureDetails: { modelNumber: 'CHG-20W', releaseDate: new Date('2023-10-05') },
        shippingDetail: { weightKg: 0.15, dimensionCm: { length: 6, width: 4, height: 4 } },
        stockKeepingUnit: 'SKU-CHG-005',
        brand: 'ChargeUp',
        variants: []
      },
      // More dummy products...
      ...Array.from({ length: 8 }).map((_, i) => ({
        sku: `TEST-${i + 6}`,
        name: `Sample Product ${i + 6}`,
        description: 'Generic sample description.',
        categories: ['CategoryA', 'CategoryB'],
        images: ['https://example.com/images/sample.jpg'],
        price: { amount: 100 + i * 50, currency: 'INR' },
        manufactureDetails: {
          modelNumber: `MOD-${i + 6}`,
          releaseDate: new Date('2024-01-01')
        },
        shippingDetail: {
          weightKg: 0.25,
          dimensionCm: {
            length: 10,
            width: 5,
            height: 5
          }
        },
        stockKeepingUnit: `SKU-SAMPLE-${i + 6}`,
        brand: 'GenericBrand',
        variants: []
      }))
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

