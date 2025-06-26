// Login user
router.post('/login', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }

  // Simulate token
  const token = `token-${user.id}`;
  res.json({ message: 'Login successful', token });
});
