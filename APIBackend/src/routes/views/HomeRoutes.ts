import express, { Request, Response } from 'express';
import { UserDocument } from '../../models/User';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/views/auth/login');
    }

    const user = req.user as UserDocument;

    res.render('home', {
        userName: user.userName,
        email: user.email,
    });
});

export default router;
