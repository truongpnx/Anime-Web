import express, { Request, Response } from 'express';
import { getAllGenre } from '../../controllers/GenreController';
import axios from 'axios';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const apiURL = `${process.env.BACKEND_URL}${process.env.API_VERSION_PATH}`;
        const response = await axios.get(`${apiURL}/genres`, { withCredentials: true });
        if (response.status === 200) {
            const genres = response.data;
            return res.render('genres', { genres, error: null });
        }
        return res.render('genres', { genres: [], error: response });
    } catch (err) {
        res.render('genres', { genres: [], error: (err as Error).message });
    }
});

export default router;
