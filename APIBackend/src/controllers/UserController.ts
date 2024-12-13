import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { isValidEmail } from '../helper/stringHelper';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    res.send('Need to get token');
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(401).json({ error: 'Unauthorization' });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorization' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Unauthorization' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in user login', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        if (!isValidEmail(req.body.email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        const user = new User(req.body);
        const savedUser = await user.save();

        res.json(savedUser);
    } catch (error) {
        console.error('Error in user signUp', error);
        res.status(400).json({ error: (error as Error).message });
    }
};
