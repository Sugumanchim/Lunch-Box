const { subscriptions } = require('../models/dataStore');
let subscriptionIdCounter = 1;

const createSubscription = (req, res) => {
  const { userId, planType, startDate, endDate } = req.body;
  if (!userId || !planType || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newSubscription = {
    subscriptionId: `s${subscriptionIdCounter++}`,
    userId,
    planType,
    startDate, 
    endDate
  };
  subscriptions.push(newSubscription);
  res.status(201).json(newSubscription);
};

const getSubscriptionByUserId = (req, res) => {
  const userId = req.params.userId;
  const subscription = subscriptions.find(sub => sub.userId === userId);
  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }
  res.json(subscription);
};

module.exports = {
  createSubscription,
  getSubscriptionByUserId
};

