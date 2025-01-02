import { NextFunction, Request, Response } from 'express';
import passport from '../controllers/PassportController';
import { UserDocument } from '../models/User';
import { IVerifyOptions } from 'passport-local';

export async function authCallBack(req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_URL}`);
}

export async function passportLocalLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (error: any, user: UserDocument, infor: IVerifyOptions) => {
        if (error) {
            req.loginResult = { success: false, message: 'Internal Server Error' };
            return next(error);
        }

        if (!user) {
            req.loginResult = { success: false, message: infor?.message || 'Unauthorized' };
            return next();
        }

        req.logIn(user, (err) => {
            if (err) {
                req.loginResult = { success: false, message: 'Internal Server Error' };
                return next(err);
            }
            req.loginResult = { success: true, message: 'Login successful', user };
            next();
        });
    })(req, res, next);
}

export function passportMediaLogin(media: string) {
    const url = `${process.env.BACKEND_URL}/${process.env.API_VERSION_PATH}`;
    return passport.authenticate(media, {
        failureRedirect: `${url}/failure`,
    });
}
