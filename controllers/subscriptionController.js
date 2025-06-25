const { subscriptions } = require('../models/dataStore');
let subscriptionIdCounter = 1;

exports.createSubscription = (req, res) => {
  const { userId, planType, startDate } = req.body;
  const days = planType === 'Weekly' ? 7 : 30;
  const end = new Date(startDate);
  end.setDate(end.getDate() + days);

  const subscription = {
    subscriptionId: `s${subscriptionIdCounter++}`,
    userId,
    planType,
    startDate,
    endDate: end.toISOString().split('T')[0]
  };

  subscriptions.push(subscription);
  res.json(subscription);
};

exports.getSubscription = (req, res) => {
  const sub = subscriptions.find(s => s.userId === req.params.userId);
  if (sub) res.json(sub);
  else res.status(404).json({ message: 'Subscription not found' });
};
