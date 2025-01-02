import express from 'express';
const router = express.Router();

import loginRoutes from './AuthRoutes';
import homeRoutes from './HomeRoutes';
import genresRoutes from './GenresRoutes';

router.use('/auth', loginRoutes);
router.use('/home', homeRoutes);
// router.use('/animes', animesRoutes);
router.use('/genres', genresRoutes);

export default router;
