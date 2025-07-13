const bcrypt = require('bcrypt'); 
const User = require('../models/user');

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const dummyUsers = [
      {
        firstName: 'Sana',
        lastName: 'Croft',
        email: 'sana@example.com',
         hashedPassword: await bcrypt.hash('defaultPassword123', 10), 
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
         hashedPassword: await bcrypt.hash('defaultPassword456', 10),
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



