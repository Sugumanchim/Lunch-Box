const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId
} = require('../controllers/orderController');

// ✅ POST /order - Place a new order
router.post('/', placeOrder);

// ✅ GET /order - Get all orders
router.get('/', getAllOrders);

// ✅ IMPORTANT: Place this route before :id to avoid route conflict
// GET /order/user/:userId - Get all orders for a specific user
router.get('/user/:userId', getOrdersByUserId);

// ✅ GET /order/:id - Get a specific order by ID
router.get('/:id', getOrderById);

// ✅ PUT /order/:id - Update an order
router.put('/:id', updateOrder);

// ✅ DELETE /order/:id - Delete an order
router.delete('/:id', deleteOrder);

module.exports = router;
