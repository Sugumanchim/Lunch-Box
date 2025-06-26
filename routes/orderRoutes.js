const express = require('express');
const router = express.Router();
const { users, orders, mealBoxes } = require('../models/dataStore');
let orderIdCounter = 1;
router.post('/', (req, res) => {
  const { userId, mealBoxId, quantity } = req.body;
  if (!userId || !mealBoxId || !quantity) {
    return res.status(400).json({ message: 'All order fields are required.' });
  }
  const user = users.find(u => u.id === userId);
  const mealBox = mealBoxes.find(mb => mb.id === mealBoxId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!mealBox) return res.status(404).json({ message: 'Meal box not found' });
  const newOrder = {
    orderId: `o${orderIdCounter++}`,
    userId,
    mealBoxId,
    quantity,
    totalPrice: mealBox.price * quantity
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});
router.get('/', (req, res) => {
  res.json(orders);
});
module.exports = router;
