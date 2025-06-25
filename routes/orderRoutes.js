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

// Route definitions
router.post('/', placeOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById); // for individual order
router.get('/user/:userId', getOrdersByUserId); // optional: fetch by user
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
