module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer dummy-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
