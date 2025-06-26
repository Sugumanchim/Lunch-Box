const { subscriptions, users } = require('../models/dataStore');
let subscriptionIdCounter = 1;

function getDaysDiff(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate - startDate) / (1000 * 60 * 60 * 24);
}

const createSubscription = (req, res) => {
  const { userId, planType, startDate, endDate } = req.body;

  if (!userId || !planType || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userExists = users.find(u => u.id === userId);
  if (!userExists) {
    return res.status(404).json({ message: 'User not found. Please register first.' });
  }

  const validPlans = ['Weekly', 'Monthly'];
  if (!validPlans.includes(planType)) {
    return res.status(400).json({ message: 'Invalid plan type. Choose Weekly or Monthly.' });
  }

  const duration = getDaysDiff(startDate, endDate);
  if (planType === 'Weekly' && duration !== 7) {
    return res.status(400).json({ message: 'Weekly plan must be exactly 7 days long.' });
  }
  if (planType === 'Monthly' && (duration < 28 || duration > 31)) {
    return res.status(400).json({ message: 'Monthly plan must be 28 to 31 days long.' });
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
  const userSubs = subscriptions.filter(sub => sub.userId === userId);

  if (userSubs.length === 0) {
    return res.status(404).json({ message: 'No subscriptions found for this user.' });
  }

  res.json(userSubs);
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
