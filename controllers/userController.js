const { users } = require('../models/dataStore'); 
let userIdCounter = 1;

const registerUser = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email required' });
  }
  const existing = users.find(user => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists', userId: existing.userId });
  }
  const user = {
    userId: `u${userIdCounter++}`,
    name,
    email,
    phone: phone || null
  };

  users.push(user);
  res.status(201).json(user);
};
const getUsers = (req, res) => {
  res.json(users);
};
const getUserById = (req, res) => {
  const user = users.find(u => u.userId === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
const updateUser = (req, res) => {
  const user = users.find(u => u.userId === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name, email, phone } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  res.json(user);
};
const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.userId === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
};
module.exports = {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
