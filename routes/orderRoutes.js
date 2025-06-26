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

router.post('/', placeOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
module.exports = router;
