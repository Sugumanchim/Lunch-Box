const express = require('express');
const router = express.Router();
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal
} = require('../controllers/mealController');
router.post('/', createMeal);
router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);
module.exports = router;
