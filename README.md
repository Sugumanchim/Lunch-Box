
# The Lunch Box – Backend API

A Node.js Express-based RESTful backend service for managing a scheduled lunch box meal ordering and subscription system.

## 📦 Project Structure

- **app.js**: Main server file
- **controllers/**: Business logic handlers
- **routes/**: API route definitions
- **models/**: In-memory data storage
- **middleware/**: Authentication
- **index.html**: User registration form
- **order.html**: Place order form
- **subscribe.html**: Subscription form

## 🚀 Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   node app.js
   ```

3. **Access in browser**
   ```
   http://localhost:3000/
   ```

## 📬 API Endpoints

### User
- `POST /register` → Register a new user
- `GET /register` → Get all users

### Order
- `POST /order` → Place a new order (requires `Authorization: Bearer secret123`)
- `GET /orders/:userId` → Get orders by user

### Subscription
- `POST /subscribe` → Create a subscription (requires auth)
- `GET /subscription/:userId` → Get user subscription

### MealBox
- `POST /mealbox` → Add a new meal box
- `GET /mealbox` → List all meal boxes

### Notification (Bonus)
- `POST /notify` → Send mock notification (optional)

## 🔐 Authentication

For protected routes, include this header:
```
Authorization: Bearer secret123
```

## 🧪 Sample Request

**POST /register**
```json
{
  "name": "Maheswari",
  "email": "maheswari@example.com"
}
```

**Response**
```json
{
  "userId": "u1",
  "name": "Maheswari",
  "email": "maheswari@example.com"
}


