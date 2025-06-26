const { orders, mealBoxes } = require('../models/dataStore');

let orderCounter = 1;

const placeOrder = (req, res) => {
  const { userId, items, deliveryDate } = req.body;

  if (!userId || !items || !deliveryDate) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const totalAmount = items.reduce((sum, id) => {
    const item = mealBoxes.find(m => m.id === id);
    return item ? sum + item.price : sum;
  }, 0);

  const newOrder = {
    orderId: `o${orderCounter++}`,
    userId,
    items,
    totalAmount,
    deliveryDate,
    status: 'Preparing'
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

const getAllOrders = (req, res) => res.json(orders);

const getOrderById = (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

const updateOrder = (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const { status } = req.body;
  if (status) order.status = status;

  res.json(order);
};

const deleteOrder = (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  orders.splice(index, 1);
  res.json({ message: 'Order deleted' });
};

const getOrdersByUserId = (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId
};
