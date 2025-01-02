import express, { NextFunction, Request, Response } from 'express';
import passport from '../../controllers/PassportController';
import { authCallBack, passportLocalLogin, passportMediaLogin } from '../../controllers/AuthController';
import { signUp } from '../../controllers/UserController';

const router = express.Router();

router.post('/login', passportLocalLogin, (req: Request, res: Response) => {
    const loginResult = req.loginResult;
    if (!loginResult?.success) {
        return res.status(401).json({ error: loginResult?.message || 'Login failed' });
    }
    res.status(200).json({ message: loginResult.message, user: loginResult.user });
});

router.post('/register', signUp);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    (req: Request, res: Response, next: NextFunction) => {
        passportMediaLogin('google')(req, res, next);
    },
    authCallBack,
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
    '/facebook/callback',
    (req: Request, res: Response, next: NextFunction) => {
        passportMediaLogin('google')(req, res, next);
    },
    authCallBack,
);

router.get('/failure', function (req: Request, res: Response, next: NextFunction) {
    res.sendStatus(401);
});

router.delete('/logout', function (req: Request, res: Response, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout Success' });
    });
});

export default router;
