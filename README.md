

# 🏡Real-Scape: a Real Estate Platform

### An advanced MERN-stack-based real estate marketplace where users can buy, sell, wishlist, and review properties. Agents can manage their listings, and admins have full control over platform operations.

## 🌐 Live Demo https://realscape-c226c.web.app/

- Server Repository: https://github.com/mustafiz8g/Real_Scape_Server

---

## 📖 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation & Setup](#-installation--setup)
- [Project Screenshots](#-project-screenshots)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Contributors](#-contributors)
- [License](#-license)

---

## ✨ Features

- ✅ **User Roles:** User, Agent, Admin.
- 🔒 **Secure Authentication:** Email/password authentication with JWT protection & Google sign-in.
- 🏠 **Property Listings:** Agents can add properties, which require admin verification.
- ❤️ **Wishlist & Purchase:** Users can wishlist properties and make purchase offers.
- 📝 **Property Reviews:** Users can review properties & admins can manage reviews.
- 🔔 **Real-Time Notifications:** Toast messages for CRUD operations & authentication.
- 📊 **Agent Dashboard:** Agents can manage their properties and view transaction history.
- 🎛 **Admin Panel:** Admins can manage users, properties, and reviews.
- 🔍 **Search & Filter:** Users can search properties based on location and sort by price.
- 📱 **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

---

## 🛠️ Technologies Used

### **Frontend (Client)**
- ⚛ **React.js (Vite)**
- 🚀 **React Router**
- 🎨 **Tailwind CSS**
- 🔥 **Firebase Authentication**
- ⚡ **TanStack Query (React Query)**
- 🔗 **Axios**
- 🎉 **SweetAlert2 / Toast Notifications**

### **Backend (Server)**
- 🌐 **Node.js**
- ⚡ **Express.js**
- 🛢 **MongoDB (Mongoose)**
- 🔑 **JSON Web Token (JWT)**
- ☁ **Cloudinary (for Image Uploads)**

### **Other Tools**
- 💰 **Stripe Payment Gateway**
- 🔐 **Dotenv for Environment Variables**

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/real-scape-client.git
git clone https://github.com/yourusername/real-scape-server.git
```

### **2️⃣ Install Dependencies**
 "@firebasegen/default-connector": "file:dataconnect-generated/js/default-connector",
    "@headlessui/react": "^2.2.0",
    "@tailwindcss/vite": "^4.0.0",
    "@tanstack/react-query": "^5.64.2",
    "axios": "^1.7.9",
    "firebase": "^11.2.0",
    "localforage": "^1.10.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.3",
    "react-spinners": "^0.15.0",
    "sort-by": "^0.0.2",
    "sweetalert2": "^11.15.10",
    "swiper": "^11.2.1"
#### Frontend:
```bash
cd real-scape-client
npm install
```
#### Backend:
```bash
cd real-scape-server
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in both **client** and **server** directories with the required API keys.

#### **Frontend (`real-scape-client/.env`)**
```plaintext
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_BACKEND_URL=http://localhost:5000
```

#### **Backend (`real-scape-server/.env`)**
```plaintext
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Start the Development Servers**
#### Frontend:
```bash
npm run dev
```
#### Backend:
```bash
npm run start
```

---

## 🖼️ Project Screenshots

_Add screenshots here to showcase UI and features._

---

## 🔌 API Endpoints

### **User Authentication**
| Method | Endpoint          | Description                  |
|--------|------------------|------------------------------|
| POST   | `/api/auth/signup` | Register a new user         |
| POST   | `/api/auth/login` | User login & JWT generation |
| GET    | `/api/auth/user`  | Get logged-in user details  |

### **Properties**
| Method | Endpoint               | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/properties`       | Get all verified properties        |
| POST   | `/api/properties`       | Add a new property (Agent only)    |
| GET    | `/api/properties/:id`   | Get property details               |
| DELETE | `/api/properties/:id`   | Delete property (Agent/Admin)      |

### **Wishlist & Purchase**
| Method | Endpoint                     | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/api/wishlist`               | Add a property to wishlist     |
| DELETE | `/api/wishlist/:id`           | Remove a property from wishlist |
| POST   | `/api/purchase`               | Make an offer on a property     |
| GET    | `/api/purchase`               | Get all purchase history        |

### **Reviews**
| Method | Endpoint                     | Description                      |
|--------|-------------------------------|----------------------------------|
| POST   | `/api/reviews`               | Add a review to a property      |
| GET    | `/api/reviews/:propertyId`   | Get reviews for a property      |
| DELETE | `/api/reviews/:id`           | Delete a review (Admin/User)    |

---

## 🤝 Contributors

👤 **Email**  
📧 Email: mustafizur8g@gamil.com


---


