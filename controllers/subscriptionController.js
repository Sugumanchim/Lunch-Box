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

const getAllSubscriptions = (req, res) => {
  res.json(subscriptions);
};

const getSubscriptionById = (req, res) => {
  const subId = req.params.id;
  const subscription = subscriptions.find(sub => sub.subscriptionId === subId);

  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  res.json(subscription);
};

const getSubscriptionByUserId = (req, res) => {
  const userId = req.params.userId;
  const subscription = subscriptions.find(sub => sub.userId === userId);

  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found for user' });
  }

  res.json(subscription);
};

const updateSubscription = (req, res) => {
  const subId = req.params.id;
  const subscription = subscriptions.find(sub => sub.subscriptionId === subId);

  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  const { planType, startDate, endDate } = req.body;
  if (planType) subscription.planType = planType;
  if (startDate) subscription.startDate = startDate;
  if (endDate) subscription.endDate = endDate;

  res.json(subscription);
};

const deleteSubscription = (req, res) => {
  const subId = req.params.id;
  const index = subscriptions.findIndex(sub => sub.subscriptionId === subId);

  if (index === -1) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  subscriptions.splice(index, 1);
  res.json({ message: 'Subscription deleted' });
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionByUserId,
  updateSubscription,
  deleteSubscription
};
