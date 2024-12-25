import express, { Request, Response } from 'express';
const router = express.Router();
import {
    addAnime,
    countAnimes,
    deleteAnime,
    getAllAnime,
    getAllAnimeByGenre,
    getAnimeById,
    getBatchAnimes,
    updateAnime,
} from '../controllers/AnimeController';

import episodeRoutes from './EpisodeRoutes';
import {
    addAnimeDetails,
    deleteAnimeDetails,
    getAnimeDetails,
    updateAnimeDetails,
} from '../controllers/AnimeDetailsController';
import { verifyAdmin } from '../middleware';

// Anime Routes

router.get('/', (req: Request, res: Response) => {
    if (req.query['batch-size']) {
        return getBatchAnimes(req, res);
    }

    if (req.query.genre) {
        return getAllAnimeByGenre(req, res, req.query.genre.toString());
    }
    getAllAnime(req, res);
});
router.get('/counts', countAnimes);
router.get('/:id', getAnimeById);
router.post('/new', verifyAdmin, addAnime);
router.post('/:id', verifyAdmin, updateAnime);
router.delete('/:id', verifyAdmin, deleteAnime);

router.get('/:id/details', getAnimeDetails);
router.post('/:id/details/new', verifyAdmin, addAnimeDetails);
router.post('/:id/details', verifyAdmin, updateAnimeDetails);
router.delete('/:id/details', verifyAdmin, deleteAnimeDetails);

router.use('/:animeId/episodes', episodeRoutes);

export default router;
