import express from 'express';
import {
    addEpisode,
    deleteEpisode,
    getAllEpisode,
    getEpisodeById,
    updateEpisode,
} from '../controllers/EpisodeController';
const router = express.Router({ mergeParams: true });

router.get('/', getAllEpisode);
router.get('/:episodeId', getEpisodeById);
router.post('/add', addEpisode);
router.post('/update', updateEpisode);
router.delete('/:episodeId', deleteEpisode);

export default router;
