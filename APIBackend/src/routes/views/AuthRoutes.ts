import express, { Request, Response } from 'express';
import { passportLocalLogin } from '../../controllers/AuthController';
const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.redirect('/views/home');
    }

    res.render('login');
});

router.get('/register', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.redirect('/views/home');
    }

    res.render('register');
});

router.post('/login', passportLocalLogin, async (req: Request, res: Response) => {
    const loginResult = req.loginResult;
    if (!loginResult?.success) {
        res.render('login', { error: loginResult?.message });
    }
    return res.redirect('/views/home');
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
