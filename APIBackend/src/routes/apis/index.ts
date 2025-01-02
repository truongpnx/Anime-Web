import express from 'express';
const router = express.Router();

import animeRoutes from './AnimeRoutes';
import genreRoutes from './GenreRoutes';
import userRoutes from './UserRoutes';
import commentRoutes from './CommentRoutes';
import authRoutes from './AuthRoutes';

router.use('/animes', animeRoutes);
router.use('/genres', genreRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/', authRoutes);

export default router;
