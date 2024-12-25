import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../models/User';

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.sendStatus(403);
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && (req.user as UserDocument).role === 'Admin') {
        return next();
    }
    return res.sendStatus(403);
};
