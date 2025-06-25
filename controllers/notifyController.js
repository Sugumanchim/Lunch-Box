const { orders } = require('../models/dataStore');

exports.notifyStatus = (req, res) => {
  const { orderId, status } = req.body;
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  res.json({ message: `Order ${orderId} updated to ${status}` });
};
