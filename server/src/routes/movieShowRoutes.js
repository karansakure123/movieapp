import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
  getMovieShows,
  getMovieShow,
  createMovieShow,
  updateMovieShow,
  deleteMovieShow
} from '../controllers/movieShowController.js';

// Configure multer for this route
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const router = express.Router();

// GET /api/movie-shows - Get all movie shows with pagination
router.get('/', authenticateToken, getMovieShows);

// GET /api/movie-shows/:id - Get single movie show
router.get('/:id', authenticateToken, getMovieShow);

// POST /api/movie-shows - Create new movie show
router.post('/', authenticateToken, upload.single('image'), createMovieShow);

// PUT /api/movie-shows/:id - Update movie show
router.put('/:id', authenticateToken, upload.single('image'), updateMovieShow);

// DELETE /api/movie-shows/:id - Delete movie show
router.delete('/:id', authenticateToken, deleteMovieShow);

export default router;