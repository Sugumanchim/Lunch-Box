const express = require('express');
const router = express.Router();
const { users } = require('../models/dataStore');

let userIdCounter = users.length + 1;

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = {
    id: `u${userIdCounter++}`,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
