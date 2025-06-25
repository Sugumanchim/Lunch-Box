let subscriptions = []; // In-memory store

// Create subscription
const createSubscription = (req, res) => {
  const { userId, startDate, endDate } = req.body;
  if (!userId || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const sub = { id: Date.now(), userId, startDate, endDate };
  subscriptions.push(sub);
  res.status(201).json(sub);
};

// Get all subscriptions
const getAllSubscriptions = (req, res) => {
  res.json(subscriptions);
};

// Get subscription by ID
const getSubscriptionById = (req, res) => {
  const sub = subscriptions.find(s => s.id == req.params.id);
  if (!sub) return res.status(404).json({ message: 'Subscription not found' });
  res.json(sub);
};

// Update subscription
const updateSubscription = (req, res) => {
  const sub = subscriptions.find(s => s.id == req.params.id);
  if (!sub) return res.status(404).json({ message: 'Subscription not found' });

  const { userId, startDate, endDate } = req.body;
  if (userId) sub.userId = userId;
  if (startDate) sub.startDate = startDate;
  if (endDate) sub.endDate = endDate;
  res.json(sub);
};

// Delete subscription
const deleteSubscription = (req, res) => {
  subscriptions = subscriptions.filter(s => s.id != req.params.id);
  res.json({ message: 'Subscription deleted' });
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription
};
