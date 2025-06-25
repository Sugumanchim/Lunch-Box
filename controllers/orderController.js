let orders = []; // In-memory store

// Create order
const placeOrder = (req, res) => {
  const { userId, mealId, date } = req.body;
  if (!userId || !mealId || !date) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const newOrder = { id: Date.now(), userId, mealId, date };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// Get all orders
const getAllOrders = (req, res) => {
  res.json(orders);
};

// Get one order by ID
const getOrderById = (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

// Optional: Get orders by userId
const getOrdersByUserId = (req, res) => {
  const userOrders = orders.filter(o => o.userId == req.params.userId);
  res.json(userOrders);
};

// Update an order
const updateOrder = (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const { userId, mealId, date } = req.body;
  if (userId) order.userId = userId;
  if (mealId) order.mealId = mealId;
  if (date) order.date = date;

  res.json(order);
};

// Delete an order
const deleteOrder = (req, res) => {
  orders = orders.filter(o => o.id != req.params.id);
  res.json({ message: 'Order deleted' });
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId
};
