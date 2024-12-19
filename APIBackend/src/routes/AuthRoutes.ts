import express, { Request, Response } from 'express';
import passport from '../controllers/PassportController';
import { authCallBack } from '../controllers/AuthController';
import { UserDocument } from '../models/User';
import { IVerifyOptions } from 'passport-local';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    passport.authenticate('local', (error: any, user: UserDocument, infor: IVerifyOptions) => {
        if (error) {
            console.error('Login error', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(401).json({ error: infor.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({
                id: user._id,
                name: user.userName,
                email: user.email,
            });
        });
    })(req, res);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/login/failure`,
    }),
    authCallBack,
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: `${process.env.FRONTEND_URL}/login/failure`,
    }),
    authCallBack,
);

router.delete('/logout', function (req: Request, res: Response, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout Success' });
    });
});

export default router;
