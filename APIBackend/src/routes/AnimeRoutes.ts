import express, { Request, Response } from 'express';
const router = express.Router();
import { addAnime, deleteAnime, getAllAnime, getAnimeById, updateAnime } from '../controllers/AnimeController';

import episodeRoutes from './EpisodeRoutes';
import detailsRoutes from './AnimeDetailsRoutes';

// Anime Routes

router.get('/', getAllAnime);
router.get('/:id', getAnimeById);
router.post('/add', addAnime);
router.post('/:id/update', updateAnime);
router.delete('/:id', deleteAnime);

router.use('/:animeId/details', detailsRoutes);

router.use('/:animeId/episodes', episodeRoutes);

export default router;
