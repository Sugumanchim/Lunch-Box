const { users } = require('../models/dataStore');
let userIdCounter = 1;

exports.registerUser = (req, res) => {
  const { name, email, phone } = req.body;
  const user = { userId: `u${userIdCounter++}`, name, email, phone };
  users.push(user);
  res.json(user);
};
