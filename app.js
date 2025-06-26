const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const authMiddleware = require('./middleware/auth');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notifyRoutes = require('./routes/notifyRoutes');
const mealRoutes = require('./routes/mealRoutes');

app.use(express.json());

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/order-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html'));
});

app.get('/subscribe-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'subscribe.html'));
});

app.get('/meal-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'meal.html'));
});

app.get('/', (req, res) => {
  res.send('Welcome to The Lunch Box API!');
});

app.use('/register', userRoutes);
app.use('/order', authMiddleware, orderRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/subscribe', authMiddleware, subscriptionRoutes);
app.use('/subscription', authMiddleware, subscriptionRoutes);
app.use('/notify', authMiddleware, notifyRoutes);
app.use('/mealbox', mealRoutes);
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
