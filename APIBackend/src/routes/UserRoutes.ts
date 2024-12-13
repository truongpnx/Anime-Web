import express from 'express';
import { getUser, login, signUp } from '../controllers/UserController';
const router = express.Router();

router.get('/', getUser);
router.post('/login', login);
router.post('/signUp', signUp);

export default router;
