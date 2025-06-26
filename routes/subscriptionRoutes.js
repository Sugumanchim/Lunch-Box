const express = require('express');
const router = express.Router();

const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionByUserId, // ✅ Needed for /subscription/:userId
  updateSubscription,
  deleteSubscription
} = require('../controllers/subscriptionController');

// Create new subscription
router.post('/', createSubscription);

// Get all subscriptions
router.get('/', getAllSubscriptions);

// Get subscription by subscriptionId
router.get('/:id', getSubscriptionById);

// ✅ Get subscription by userId
router.get('/user/:userId', getSubscriptionByUserId);

// Update a subscription
router.put('/:id', updateSubscription);

// Delete a subscription
router.delete('/:id', deleteSubscription);

module.exports = router;
