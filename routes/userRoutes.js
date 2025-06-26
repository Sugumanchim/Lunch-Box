// routes/userRoutes.js
const express = require('express');
const router = express.Router();

let users = []; // Temporary in-memory user store

// Create/Register a user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email required' });
  }

  const existing = users.find(user => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
