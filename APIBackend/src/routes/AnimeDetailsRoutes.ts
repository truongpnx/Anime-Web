import express from 'express';
import {
    addAnimeDetails,
    deleteAnimeDetails,
    getAnimeDetails,
    updateAnimeDetails,
} from '../controllers/AnimeDetailsController';
const router = express.Router({ mergeParams: true });

router.get('/', getAnimeDetails);
router.post('/add', addAnimeDetails);
router.post('/update', updateAnimeDetails);
router.delete('/', deleteAnimeDetails);

export default router;
