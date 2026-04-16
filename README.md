# Premium Fullstack Store Application

A modern, high-fidelity full-stack marketplace application built with **NestJS**, **React (Vite 8)**, and **TypeScript**. This project features secure authentication (Local + Google SSO), Role-Based Access Control (RBAC), and a premium dynamic UI.

![Dashboard Preview](https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200)

## 🚀 Features

- **🔐 Dual Authentication**: 
  - Secure local registration and login with hashed passwords (Bcrypt).
  - One-tap login via **Google OAuth 2.0** (OpenID Connect).
  - Persistent sessions using **JWT** (JSON Web Tokens).
- **🛡️ Role-Based Access Control (RBAC)**:
  - **Admin**: Full control over product management (Add, Update, Delete).
  - **User**: Read-only marketplace access and personal profile management.
- **✨ Premium UI/UX**:
  - **Glassmorphism Design**: Beautiful transparent cards and blurred navigation.
  - **Dark Mode Aesthetic**: A sleek, modern theme with high-contrast typography.
  - **Dynamic Animations**: Smooth transitions and micro-interactions powered by CSS and Lucide Icons.
- **📦 Reliable Backend**:
  - Built with **NestJS** for scalable, modular architecture.
  - **TypeORM** integration with **SQLite** for zero-config database setup.
  - Fully automated seed system to populate initial data on first launch.

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite 8
- Vanilla CSS (Design System)
- React Router 7 (Layouts & Protected Routes)
- Lucide React (Icons)
- React Hot Toast (Notifications)
- Axios (API Communication)

**Backend:**
- NestJS 11
- TypeORM (SQLite)
- Passport.js (Local & Google Strategies)
- Bcrypt (Password Hashing)
- Class Validator & Transformer

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/Dineshbalaji25/Full-Stack-Assignment.git
cd Full-Stack-Assignment
```

### 2. Backend Configuration
Navigate to the backend directory and set up environment variables:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```env
PORT=3000
JWT_SECRET=your_generated_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Frontend Configuration
Navigate to the frontend directory:
```bash
cd ../frontend
npm install
```

---

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm run start:dev
```
*The database will be automatically seeded on the first launch.*

### Start Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👥 Demo Accounts

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` |
| **User** | `user` | `user123` |

## 📁 Project Structure

```text
Full-Stack-Assignment/
├── backend/            # NestJS Application
│   ├── src/auth/       # Authentication (Strategies, Guards, SSO)
│   ├── src/users/      # User Entity & Profiles
│   ├── src/products/   # Product Marketplace (RBAC Protected)
│   └── src/seed/       # Auto-Seeding Logic
└── frontend/           # React Application
    ├── src/context/    # State Management (AuthContext)
    ├── src/pages/      # View Layers (Login, Register, Dashboard, Profile)
    └── src/components/ # Shared UI (Navbar, Product Cards)
```

