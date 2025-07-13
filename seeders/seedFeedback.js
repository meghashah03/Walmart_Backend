const mongoose = require('mongoose');
const Feedback = require('../models/feedback');
const User = require('../models/user');

const seedFeedback = async () => {
  try {
    await Feedback.deleteMany();

    const users = await User.find({});
    if (users.length < 2) throw new Error('Not enough users to seed feedback');

    const dummyFeedbacks = [
      {
        name: `${users[0].firstName} ${users[0].lastName}`,
        email: users[0].email,
        messageCount: 3,
        feedback: "Great experience with fast delivery and smooth checkout!",
        type: 'praise',
        likes: 10,
        dislikes: 0,
        isChecked: true
      },
      {
        name: `${users[1].firstName} ${users[1].lastName}`,
        email: users[1].email,
        messageCount: 1,
        feedback: "Order got delayed. Please improve delivery speed.",
        type: 'complaint',
        likes: 1,
        dislikes: 3,
        isChecked: false
      },
      {
        name: `${users[0].firstName} ${users[0].lastName}`,
        email: users[0].email,
        messageCount: 2,
        feedback: "Can you add live tracking for warehouse inventory?",
        type: 'feature_request',
        likes: 5,
        dislikes: 0,
        isChecked: false
      }
    ];

    await Feedback.insertMany(dummyFeedbacks);
    console.log('Feedbacks seeded successfully');
  } catch (err) {
    console.error('Error seeding feedbacks:', err.message);
    throw err;
  }
};

module.exports = seedFeedback;
