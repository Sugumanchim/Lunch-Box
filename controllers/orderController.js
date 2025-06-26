const { orders, mealBoxes } = require('../models/dataStore');
let orderIdCounter = 1;

const placeOrder = (req, res) => {
  const { userId, items, deliveryDate } = req.body;
  if (!userId || !items || !deliveryDate) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const totalAmount = items.length * 100; 
  const order = {
    orderId: `o${orderIdCounter++}`,
    userId,
    items,
    totalAmount,
    deliveryDate,
    status: 'Preparing'
  };

  orders.push(order);
  res.status(201).json(order);
};

const getOrdersByUserId = (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.params.userId);
  res.json(userOrders);
};

module.exports = {
  placeOrder,
  getOrdersByUserId
};

