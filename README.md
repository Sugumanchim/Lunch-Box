
# 🍱 Lunch Box Backend API

Backend service for a scheduled lunch box ordering and subscription system.

---

## ✅ Tech Stack
- Node.js
- Express.js
- In-memory storage (arrays/objects)

---

## 📁 Project Structure
```
Lunch-Box-Backend/
├── app.js
├── package.json
├── models/
│   └── dataStore.js
├── controllers/
│   ├── userController.js
│   ├── orderController.js
│   ├── subscriptionController.js
│   └── notifyController.js
├── routes/
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   ├── subscriptionRoutes.js
│   └── notifyRoutes.js
└── middleware/
    └── auth.js
```

---

## 📦 Setup Instructions

> Server will run at: `http://localhost:3000/`

## 🔌 API Endpoints

### 1. Register User
`POST /register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### 2. Place Order
`POST /order`
```json
{
  "userId": 1,
  "items": ["Small Veg Box"],
  "totalAmount": 250,
  "deliveryDate": "2025-06-25"
}
```

### 3. Get Order History
`GET /orders/1`

### 4. Subscribe
`POST /subscribe`
```json
{
  "userId": 1,
  "planType": "Monthly",
  "startDate": "2025-06-25",
  "endDate": "2025-07-25"
}
```

### 5. Get Subscription
`GET /subscription/1`

---

## 🎁 Bonus Features
- ⏰ Cut-off time validation: Same-day orders must be placed before 9:30 AM PST
- 🔔 Mock Notification Endpoint (to be added)

---
## ✅ Evaluation Criteria
- API design & logical handling
- Code structure & clarity
- Bonus features implementation

---
