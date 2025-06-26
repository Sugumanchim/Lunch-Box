const express = require('express');
const router = express.Router();
const { addMealBox, getAllMeals } = require('../controllers/mealController');

router.post('/', addMealBox);
router.get('/', getAllMeals);

module.exports = router;
