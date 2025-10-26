import { PrismaClient } from '@prisma/client';
import { createMovieShowSchema, updateMovieShowSchema, paginationSchema, idSchema } from '../validations/movieShowValidation.js';

const prisma = new PrismaClient();

// Get all movie shows with pagination
export const getMovieShows = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = paginationSchema.parse(req.query);

    const skip = (page - 1) * limit;
    const take = limit;

    const [movieShows, total] = await Promise.all([
      prisma.movieShow.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.movieShow.count()
    ]);

    res.json({
      success: true,
      data: movieShows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching movie shows:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movie shows',
      error: error.message
    });
  }
};

// Get single movie show
export const getMovieShow = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);

    const movieShow = await prisma.movieShow.findUnique({
      where: { id }
    });

    if (!movieShow) {
      return res.status(404).json({
        success: false,
        message: 'Movie show not found'
      });
    }

    res.json({
      success: true,
      data: movieShow
    });
  } catch (error) {
    console.error('Error fetching movie show:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movie show',
      error: error.message
    });
  }
};

// Create new movie show
export const createMovieShow = async (req, res) => {
  try {
    const validatedData = createMovieShowSchema.parse(req.body);

    const movieShow = await prisma.movieShow.create({
      data: validatedData
    });

    res.status(201).json({
      success: true,
      data: movieShow,
      message: 'Movie show created successfully'
    });
  } catch (error) {
    console.error('Error creating movie show:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create movie show',
      error: error.message
    });
  }
};

// Update movie show
export const updateMovieShow = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);
    const validatedData = updateMovieShowSchema.parse(req.body);

    const movieShow = await prisma.movieShow.update({
      where: { id },
      data: validatedData
    });

    res.json({
      success: true,
      data: movieShow,
      message: 'Movie show updated successfully'
    });
  } catch (error) {
    console.error('Error updating movie show:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Movie show not found'
      });
    }

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update movie show',
      error: error.message
    });
  }
};

// Delete movie show
export const deleteMovieShow = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);

    await prisma.movieShow.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Movie show deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting movie show:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Movie show not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete movie show',
      error: error.message
    });
  }
};