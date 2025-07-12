const ChatLog = require('../models/chatlogs');
const User = require('../models/user');

const seedChatLog = async () => {
  try {
    await ChatLog.deleteMany();

    const users = await User.find();
    if (!users.length) throw new Error('No users found to seed chat logs.');

    const chatLogs = [];

    for (const user of users) {
      // Simulate a short conversation for each user
      chatLogs.push(
        {
          userId: user._id,
          role: 'user',
          message: 'Hey, I need help with my recent order.',
          timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 mins ago
        },
        {
          userId: user._id,
          role: 'assistant',
          message: 'Sure! Could you please share your order ID?',
          timestamp: new Date(Date.now() - 1000 * 60 * 9)
        },
        {
          userId: user._id,
          role: 'user',
          message: 'Order ID is #123456.',
          timestamp: new Date(Date.now() - 1000 * 60 * 8)
        },
        {
          userId: user._id,
          role: 'assistant',
          message: 'Thanks! I’ve checked and it’s currently in transit.',
          timestamp: new Date(Date.now() - 1000 * 60 * 7)
        }
      );
    }

    await ChatLog.insertMany(chatLogs);
    console.log('Chat logs seeded successfully');
  } catch (error) {
    console.error('Error seeding chat logs:', error.message);
    throw error;
  }
};

module.exports = seedChatLog;
