const express = require('express');
const router = express.Router();
const { subscriptions, users } = require('../data');

function getDaysDiff(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return diffTime / (1000 * 60 * 60 * 24);
}
router.post('/', (req, res) => {
  const { userId, planType, startDate, endDate } = req.body;

  if (!userId || !planType || !startDate || !endDate) {
    return res.status(400).json({ error: 'All subscription details are required.' });
  }

  const userExists = users.find(user => user.id === userId);
  if (!userExists) {
    return res.status(404).json({ error: 'User not found. Please register first.' });
  }

  const validPlans = ['Weekly', 'Monthly'];
  if (!validPlans.includes(planType)) {
    return res.status(400).json({ error: 'Invalid plan type. Choose Weekly or Monthly.' });
  }

  const duration = getDaysDiff(startDate, endDate);

  if (planType === 'Weekly' && duration !== 7) {
    return res.status(400).json({ error: 'Weekly plan must be exactly 7 days long.' });
  }

  if (planType === 'Monthly' && (duration < 28 || duration > 31)) {
    return res.status(400).json({ error: 'Monthly plan must be between 28 to 31 days.' });
  }
  const subscriptionId = `s${subscriptions.length + 1}`;
  const newSub = {
    subscriptionId,
    userId,
    planType,
    startDate,
    endDate
  };

  subscriptions.push(newSub);
  res.status(201).json(newSub);
});

module.exports = router;
