# Movie & TV Show Manager

A full-stack web application for managing personal movie and TV show collections. Built with React, Node.js, Express, Prisma, and MySQL.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **CRUD Operations**: Create, Read, Update, Delete movies and TV shows
- **Search & Filter**: Find content by title, director, or filter by type
- **Image Support**: Add poster images for visual appeal
- **Responsive Design**: Works on desktop and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Professional UI**: Modern design with Tailwind CSS and shadcn/ui

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI components
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM and database toolkit
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Joi** - Input validation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movieapp
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DATABASE_URL="mysql://username:password@localhost:3306/movieapp"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
```

#### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
```

### 4. Running the Application

#### Development Mode

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

#### Production Build

1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server:**
   ```bash
   cd server
   npm start
   ```

## 📁 Project Structure

```
movieapp/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server/                # Node.js backend
│   ├── prisma/           # Database schema and migrations
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utility functions
│   │   ├── validations/  # Input validation schemas
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
- `GET /api/movie-shows` - Get all movies/shows (with pagination, search, filter)
- `POST /api/movie-shows` - Create new movie/show
- `PUT /api/movie-shows/:id` - Update movie/show
- `DELETE /api/movie-shows/:id` - Delete movie/show

## 🎨 Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes for authenticated users only

### Movie/TV Show Management
- Add movies and TV shows with detailed information
- Edit existing entries
- Delete entries with confirmation
- Search by title or director
- Filter by type (Movie/TV Show)
- Pagination for large collections
- Image support for posters

### User Interface
- Responsive design for all screen sizes
- Dark/light mode support (configurable)
- Toast notifications for user feedback
- Loading states and error handling
- Professional form validation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention with Prisma
- CORS configuration
- Rate limiting (can be added)

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
NODE_ENV=production
DATABASE_URL="mysql://username:password@host:port/database"
JWT_SECRET="your-production-jwt-secret"
PORT=5000
```

### Build Commands

```bash
# Frontend build
cd client && npm run build

# Backend production start
cd server && npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 🔄 Future Enhancements

- [ ] User profile management
- [ ] Social features (sharing collections)
- [ ] Advanced search with multiple filters
- [ ] Import/Export functionality
- [ ] API rate limiting
- [ ] Email notifications
- [ ] Mobile app version

---

**Happy movie managing! 🎬🍿**