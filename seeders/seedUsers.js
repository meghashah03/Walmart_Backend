const User = require('../models/user');

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const dummyUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        hashedPassword: '$2b$10$abcdef1234567890hashedDummyPass1',
        roles: ['customer'],
        phone: '1234567890',
        addresses: [
          {
            label: 'Home',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
          }
        ]
      },
      {
        firstName: 'Alice',
        lastName: 'Walker',
        email: 'alice@example.com',
        hashedPassword: '$2b$10$abcdef1234567890hashedDummyPass2',
        roles: ['customer'],
        phone: '9876543210',
        addresses: [
          {
            label: 'Home',
            street: '789 Oak Ave',
            city: 'Chicago',
            state: 'IL',
            zip: '60601',
            country: 'USA'
          }
        ]
      }
    ];

    await User.insertMany(dummyUsers);
    console.log('Dummy users inserted');
  } catch (error) {
    console.error('Error in seedUsers:', error.message);
    throw error;
  }
};

module.exports = seedUsers;



