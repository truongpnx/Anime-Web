import express from 'express';
import { addGenre, deleteGenre, getAllGenre, getGenreById, updateGenre } from '../controllers/GenreController';
const router = express.Router();

router.get('/', getAllGenre);
router.get('/:id', getGenreById);
router.post('/add', addGenre);
router.post('/:id/update', updateGenre);
router.delete('/:id', deleteGenre);

export default router;
