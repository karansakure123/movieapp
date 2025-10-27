# MovieApp Backend

Backend server for MovieApp - A full-stack movie and TV show management application.

## 🚀 Features

- **User Authentication** (JWT-based)
- **CRUD Operations** for Movies/TV Shows
- **Search & Filter** functionality
- **MySQL Database** with Prisma ORM
- **RESTful API** with proper validation
- **Security** (Helmet, Rate limiting, CORS)
- **Health Checks** for monitoring

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Zod** - Schema validation
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js 18+
- MySQL database
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd server
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="mysql://username:password@host:port/database_name"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Movie Shows
- `GET /api/movie-shows` - Get all movies/shows (with pagination, search, filter)
- `GET /api/movie-shows/:id` - Get single movie/show
- `POST /api/movie-shows` - Create new movie/show
- `PUT /api/movie-shows/:id` - Update movie/show
- `DELETE /api/movie-shows/:id` - Delete movie/show

### Health Check
- `GET /api/health` - Server health status

## 🚢 Deployment to Railway

### 1. Railway Setup
1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Connect your GitHub repository

### 2. Database Setup
1. Add MySQL database to your Railway project
2. Copy the `DATABASE_URL` from Railway dashboard

### 3. Environment Variables
Set these in Railway environment variables:
```
DATABASE_URL=mysql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.netlify.app
```

### 4. Deploy
Railway will automatically detect Node.js and deploy using the configuration in `package.json`.

## 🔧 Available Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm run build  # Build for production (no-op for backend)
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:migrate   # Run database migrations
```

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Express middlewares
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── validations/    # Zod schemas
│   └── app.js          # Express app setup
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
├── Dockerfile          # Docker configuration
├── railway.json        # Railway deployment config
├── nixpacks.toml       # Nixpacks build config
├── healthcheck.js      # Health check script
└── package.json
```

## 🔒 Security Features

- **Helmet** - Security headers
- **Rate Limiting** - API rate limiting
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Zod schema validation
- **Password Hashing** - bcryptjs
- **JWT Authentication** - Secure token-based auth

## 📊 Health Monitoring

The server includes health check endpoints:
- `/api/health` - Main health check
- `/health` - Legacy health check

Railway will use these for monitoring and auto-restart.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details.