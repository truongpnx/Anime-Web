import express from 'express';
import { getUser, login, signUp } from '../controllers/UserController';
import { verifyToken } from '../middleware';
const router = express.Router();

router.get('/', getUser);
router.post('/register', signUp);

export default router;
