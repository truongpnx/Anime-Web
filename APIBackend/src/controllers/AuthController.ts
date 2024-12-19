import { Request, Response } from 'express';

export async function authCallBack(req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_URL}`);
}
