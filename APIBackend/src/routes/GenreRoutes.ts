import express from 'express';
import { addGenre, deleteGenre, getAllGenre, getGenreById, updateGenre } from '../controllers/GenreController';
import { verifyAdmin } from '../middleware';
const router = express.Router();

router.get('/', getAllGenre);
// router.get('/:id', getGenreById);
router.post('/new', verifyAdmin, addGenre);
router.post('/:id', verifyAdmin, updateGenre);
router.delete('/:id', verifyAdmin, deleteGenre);

export default router;
