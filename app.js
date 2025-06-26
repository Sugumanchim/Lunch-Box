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

// JSON parser middleware
app.use(express.json());

// ✅ Serve static files (like index.html)
app.use(express.static(path.join(__dirname)));

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Welcome to The Lunch Box API!');
});

// ✅ Serve registration form at /form
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ API Routes
app.use('/register', userRoutes); // Handles both GET and POST
app.use('/order', authMiddleware, orderRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/subscribe', authMiddleware, subscriptionRoutes);
app.use('/subscription', authMiddleware, subscriptionRoutes);
app.use('/notify', authMiddleware, notifyRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
