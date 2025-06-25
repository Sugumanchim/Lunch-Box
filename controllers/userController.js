const { users } = require('../models/dataStore');
let userIdCounter = 1;

exports.registerUser = (req, res) => {
  const { name, email, phone } = req.body;
  const user = { userId: `u${userIdCounter++}`, name, email, phone };
  users.push(user);
  res.json(user);
};
let users = []; // In-memory store

// Register user
const registerUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: 'Name and Email required' });

  const existing = users.find(user => user.email === email);
  if (existing)
    return res.status(409).json({ message: 'User already exists' });

  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Get all users
const getUsers = (req, res) => {
  res.json(users);
};

// Get user by ID
const getUserById = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Update user
const updateUser = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
};

// Delete user
const deleteUser = (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
