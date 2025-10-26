import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
  getMovieShows,
  getMovieShow,
  createMovieShow,
  updateMovieShow,
  deleteMovieShow
} from '../controllers/movieShowController.js';

const router = express.Router();

// GET /api/movie-shows - Get all movie shows with pagination
router.get('/', authenticateToken, getMovieShows);

// GET /api/movie-shows/:id - Get single movie show
router.get('/:id', authenticateToken, getMovieShow);

// POST /api/movie-shows - Create new movie show
router.post('/', authenticateToken, createMovieShow);

// PUT /api/movie-shows/:id - Update movie show
router.put('/:id', authenticateToken, updateMovieShow);

// DELETE /api/movie-shows/:id - Delete movie show
router.delete('/:id', authenticateToken, deleteMovieShow);

export default router;