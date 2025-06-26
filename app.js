const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
const authMiddleware = require('./middleware/auth');

// Routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notifyRoutes = require('./routes/notifyRoutes');

// JSON parser
app.use(express.json());

// Root route - welcome message
app.get('/', (req, res) => {
  res.send('Welcome to The Lunch Box API!');
});

// Serve HTML file (optional frontend form)
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
app.use('/register', userRoutes);
app.use('/order', authMiddleware, orderRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/subscribe', authMiddleware, subscriptionRoutes);
app.use('/subscription', authMiddleware, subscriptionRoutes);
app.use('/notify', authMiddleware, notifyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
