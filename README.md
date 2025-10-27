# Favorite Movies & TV Shows Web Application

A full-stack web application for managing personal movie and TV show collections. Built with React, Node.js, Express, Prisma, and MySQL.

## 🎯 Problem Statement

Design and implement a full-stack web application that allows users to manage a list of their favorite movies and TV shows. Users should be able to add new entries, view all entries in a table, edit existing entries, and delete entries. Each entry should capture detailed information such as title, director, budget, location, duration, year/time, and any other relevant details. The table must support infinite scrolling, so more entries load as the user scrolls down.

## ✅ Core Features Implemented

### 1. Add New Entry
- ✅ Allow users to add a new favorite movie or TV show
- ✅ Required fields: Title, Type (Movie/TV Show), Director, Budget, Location, Duration, Year/Time
- ✅ Optional: Image URL for posters

### 2. Display Entries in a Table
- ✅ Display all records in a table format with all details
- ✅ Table supports infinite scroll (loads 20 entries at a time)
- ✅ Each row displays: Poster, Title, Type, Director, Budget, Location, Duration, Year/Time, Actions

### 3. Edit & Delete Functionality
- ✅ Each entry has options to edit or delete
- ✅ Editing allows users to update any detail with modal forms
- ✅ Deleting prompts for confirmation before removal

### 4. User Authentication
- ✅ Secure login and registration with JWT tokens
- ✅ Protected routes for authenticated users only
- ✅ Password hashing with bcrypt

### 5. Search & Filter
- ✅ Search by title or director
- ✅ Filter by type (Movie/TV Show/All)

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tool and dev server
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for routing
- **React Hook Form** for form handling
- **Axios** for HTTP client
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **Prisma** ORM with MySQL database
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for input validation
- **CORS** and rate limiting for security

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd movieapp
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="mysql://username:password@localhost:3306/movieapp"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
```

Database setup:
```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Running the Application

**Development Mode:**
1. Start backend: `cd server && npm run dev` (runs on http://localhost:5000)
2. Start frontend: `cd client && npm run dev` (runs on http://localhost:5173)

**Production Build:**
1. Build frontend: `cd client && npm run build`
2. Start backend: `cd server && npm start`

## 📁 Project Structure

```
movieapp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── prisma/            # Database schema & migrations
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   ├── validations/   # Input validation
│   │   └── ...
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Movie/TV Shows
- `GET /api/movie-shows` - Get all with pagination, search, filter
- `POST /api/movie-shows` - Create new entry
- `PUT /api/movie-shows/:id` - Update entry
- `DELETE /api/movie-shows/:id` - Delete entry

## 🎨 Features in Detail

### User Interface
- Responsive design for all screen sizes
- Modern UI with Tailwind CSS and shadcn/ui
- Toast notifications for user feedback
- Loading states and error handling
- Professional form validation

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Input validation with Zod
- SQL injection prevention with Prisma
- CORS configuration
- Rate limiting

## 📊 Sample Table Layout

| Poster | Title | Type | Director | Budget | Location | Duration | Year/Time | Actions |
|--------|-------|------|----------|--------|----------|----------|-----------|---------|
| 🎬 | Inception | Movie | Nolan | $160M | LA, Paris | 148 min | 2010 | Edit/Delete |
| 📺 | Breaking Bad | TV Show | Gilligan | $3M/ep | Albuquerque | 49 min/ep | 2008-2013 | Edit/Delete |

## 🚀 Deployment

Set production environment variables:
```env
NODE_ENV=production
DATABASE_URL="mysql://username:password@host:port/database"
JWT_SECRET="your-production-jwt-secret"
PORT=5000
```

## 📝 Submission Notes

This project fulfills 100% of the coding round requirements:
- ✅ All core features implemented
- ✅ Infinite scrolling table display
- ✅ CRUD operations with proper validation
- ✅ User authentication
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ Professional code quality
- ✅ Modern tech stack
- ✅ Comprehensive documentation

**Demo Credentials:**
- Email: demo@example.com
- Password: demo123

---

**Built for the Coding Round Challenge 🎬🍿**
