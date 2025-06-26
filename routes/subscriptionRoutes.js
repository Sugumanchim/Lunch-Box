const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionByUserId,
  updateSubscription,
  deleteSubscription
} = require('../controllers/subscriptionController');

router.post('/', createSubscription);

router.get('/', getAllSubscriptions);

router.get('/:id', getSubscriptionById);

router.get('/user/:userId', getSubscriptionByUserId);

router.put('/:id', updateSubscription);

router.delete('/:id', deleteSubscription);

module.exports = router;
