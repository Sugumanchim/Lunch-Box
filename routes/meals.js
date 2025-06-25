const express = require('express');
const router = express.Router();

let meals = []; // Temporary in-memory store

// Create meal
router.post('/', (req, res) => {
  const { name, price, type } = req.body;
  if (!name || !price || !type) return res.status(400).json({ message: 'All fields required' });

  const meal = { id: Date.now(), name, price, type };
  meals.push(meal);
  res.status(201).json(meal);
});

// Get all meals
router.get('/', (req, res) => {
  res.json(meals);
});

// Get one meal
router.get('/:id', (req, res) => {
  const meal = meals.find(m => m.id == req.params.id);
  if (!meal) return res.status(404).json({ message: 'Meal not found' });
  res.json(meal);
});

// Update meal
router.put('/:id', (req, res) => {
  const meal = meals.find(m => m.id == req.params.id);
  if (!meal) return res.status(404).json({ message: 'Meal not found' });

  const { name, price, type } = req.body;
  if (name) meal.name = name;
  if (price) meal.price = price;
  if (type) meal.type = type;
  res.json(meal);
});

// Delete meal
router.delete('/:id', (req, res) => {
  meals = meals.filter(m => m.id != req.params.id);
  res.json({ message: 'Meal deleted' });
});

module.exports = router;
