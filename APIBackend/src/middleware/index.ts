import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req);

    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

interface SessionData extends session.SessionData {
    user?: any;
}

export const verifySession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !(req.session as SessionData).user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
