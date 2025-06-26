let meals = []; 
const createMeal = (req, res) => {
  const { name, price, type } = req.body;
  if (!name || !price || !type) {
    return res.status(400).json({ message: 'Name, price, and type are required' });
  }

  const newMeal = { id: Date.now(), name, price, type };
  meals.push(newMeal);
  res.status(201).json(newMeal);
};


const getAllMeals = (req, res) => {
  res.json(meals);
};
const getMealById = (req, res) => {
  const meal = meals.find(m => m.id == req.params.id);
  if (!meal) return res.status(404).json({ message: 'Meal not found' });
  res.json(meal);
};
const updateMeal = (req, res) => {
  const meal = meals.find(m => m.id == req.params.id);
  if (!meal) return res.status(404).json({ message: 'Meal not found' });

  const { name, price, type } = req.body;
  if (name) meal.name = name;
  if (price) meal.price = price;
  if (type) meal.type = type;

  res.json(meal);
};
const deleteMeal = (req, res) => {
  meals = meals.filter(m => m.id != req.params.id);
  res.json({ message: 'Meal deleted' });
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal
};
