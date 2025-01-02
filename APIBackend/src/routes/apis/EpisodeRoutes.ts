import express from 'express';
import {
    addEpisode,
    deleteEpisode,
    getAllEpisode,
    getEpisodeById,
    updateEpisode,
} from '../../controllers/EpisodeController';
import { verifyAdmin } from '../../middleware';
const router = express.Router({ mergeParams: true });

router.get('/', getAllEpisode);
router.get('/counts', getAllEpisode);
router.get('/:episodeId', getEpisodeById);
router.post('/new', verifyAdmin, addEpisode);
router.post('/:episodeId', verifyAdmin, updateEpisode);
router.delete('/:episodeId', verifyAdmin, deleteEpisode);

export default router;
