import { PrismaClient } from '@prisma/client';
import { createMovieShowSchema, updateMovieShowSchema, paginationSchema, idSchema } from '../validations/movieShowValidation.js';

const prisma = new PrismaClient();

// Get all movie shows with pagination, search and filter
export const getMovieShows = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, type } = paginationSchema.parse(req.query);

    const skip = (page - 1) * limit;
    const take = limit;

    // Build where clause for search and filter
    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { director: { contains: search } }
      ];
    }
    if (type && type !== 'all') {
      where.type = type;
    }

    const [movieShows, total] = await Promise.all([
      prisma.movieShow.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.movieShow.count({ where })
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

    // Handle image upload
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const movieShow = await prisma.movieShow.create({
      data: {
        ...validatedData,
        image: imagePath
      }
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

    // Handle image upload
    let imagePath = validatedData.image; // Keep existing image if no new upload
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const movieShow = await prisma.movieShow.update({
      where: { id },
      data: {
        ...validatedData,
        image: imagePath
      }
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