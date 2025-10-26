import { z } from 'zod';

export const createMovieShowSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  type: z.enum(['Movie', 'TV Show'], {
    errorMap: () => ({ message: 'Type must be either Movie or TV Show' })
  }),
  director: z.string().min(1, 'Director is required').max(255, 'Director must be less than 255 characters'),
  budget: z.string().min(1, 'Budget is required').max(100, 'Budget must be less than 100 characters'),
  location: z.string().min(1, 'Location is required').max(255, 'Location must be less than 255 characters'),
  duration: z.string().min(1, 'Duration is required').max(100, 'Duration must be less than 100 characters'),
  yearTime: z.string().min(1, 'Year/Time is required').max(100, 'Year/Time must be less than 100 characters')
});

export const updateMovieShowSchema = createMovieShowSchema.partial();

export const paginationSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  type: z.string().optional()
});

export const idSchema = z.object({
  id: z.string().transform(val => parseInt(val))
});