const { mealBoxes } = require('../models/dataStore');
let mealIdCounter = 1;

const addMealBox = (req, res) => {
  const { boxType, vegOrNonVeg, price, description } = req.body;
  if (!boxType || !vegOrNonVeg || !price || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMeal = {
    id: `m${mealIdCounter++}`,
    boxType,
    vegOrNonVeg,
    price,
    description
  };
  mealBoxes.push(newMeal);
  res.status(201).json(newMeal);
};

const getAllMeals = (req, res) => {
  res.json(mealBoxes);
};

module.exports = {
  addMealBox,
  getAllMeals
};

