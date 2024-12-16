import express from 'express';
import { googleAuth, goolgeAuthRequest } from '../controllers/SocialAuthController';
const router = express.Router();

router.post('/request/google', goolgeAuthRequest);
router.get('/google', googleAuth);

export default router;
