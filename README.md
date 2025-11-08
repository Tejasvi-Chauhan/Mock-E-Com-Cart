#  E-Com Cart

A full-stack shopping cart application

## 🚀 Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **API Type:** REST

---

## ⚙️ Features

### Backend APIs
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Fetch all mock products |
| POST | `/api/cart` | Add product to cart |
| DELETE | `/api/cart/:id` | Remove item from cart |
| GET | `/api/cart` | View cart + total |
| POST | `/api/checkout` | Mock checkout — returns receipt |

### Frontend
- Products grid with **Add to Cart** buttons  
- **Cart view** with remove & total  
- **Checkout form** with name & email  
- Simple responsive design  

---

## 📸 Screenshots
(Add a few images: Products page, Cart, Checkout)

---

## 🧰 Setup Instructions

### Backend
```bash
cd backend
npm install
npm start
