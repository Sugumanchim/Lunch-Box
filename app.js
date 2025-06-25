const express = require('express');
const app = express();
const PORT = 3000;

const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notifyRoutes = require('./routes/notifyRoutes');

app.use(express.json());

app.use('/register', userRoutes);
app.use('/order', authMiddleware, orderRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/subscribe', authMiddleware, subscriptionRoutes);
app.use('/subscription', authMiddleware, subscriptionRoutes);
app.use('/notify', authMiddleware, notifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
