const { orders, mealBoxes } = require('../models/dataStore');
const { isBeforeCutoff } = require('../utils/timeValidation');
let orderIdCounter = 1;

exports.placeOrder = (req, res) => {
  const { userId, items, deliveryDate } = req.body;
  const today = new Date().toISOString().split('T')[0];

  if (deliveryDate === today && !isBeforeCutoff()) {
    return res.status(400).json({ message: 'Cut-off time passed for same-day delivery' });
  }

  const totalAmount = items.reduce((sum, item) => {
    const box = mealBoxes.find(m => m.id === item.mealBoxId);
    return sum + (box ? box.price * item.quantity : 0);
  }, 0);

  const order = {
    orderId: `o${orderIdCounter++}`,
    userId,
    items,
    totalAmount,
    deliveryDate,
    status: 'Preparing'
  };

  orders.push(order);
  res.json({ orderId: order.orderId, totalAmount });
};

exports.getOrders = (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
};
