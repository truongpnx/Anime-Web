import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { isValidEmail } from '../helper/stringHelper';
import User, { UserDocument } from '../models/User';
import mongoose from 'mongoose';

export const getUserById = async function (req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.sendStatus(404);
        }

        res.json({
            id: user._id,
            email: user.email,
            userName: user.userName,
        });
    } catch (error) {
        console.error(`Error in ${getUserById.name}`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllUsers = async function (req: Request, res: Response) {
    try {
        let query: { email?: { $regex: RegExp; $options: string } } = {};

        if (req.query.q) {
            const searchTerm = req.query.q.toString();
            query.email = { $regex: new RegExp(searchTerm), $options: 'i' };
        }

        const users = await User.find(query);
        const results = users.map((user) => ({
            id: user._id,
            email: user.email,
            userName: user.userName,
        }));
        res.json(results);
    } catch (error) {
        console.error(`Error in ${getAllUsers.name}`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateUserById = async function (req: Request, res: Response) {
    const id = req.params.id;
    const currentUser = req.user as UserDocument;

    try {
        if (!mongoose.isValidObjectId(id) || id !== currentUser.id) {
            return res.sendStatus(400);
        }

        const { userName, password } = req.body;

        if (!userName && !password) {
            return res.sendStatus(400);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userName, password },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedUser) {
            return res.sendStatus(404);
        }

        res.json({
            updatedUser: {
                id: updatedUser._id,
                email: updatedUser.email,
                userName: updatedUser.userName,
            },
        });
    } catch (error) {
        console.error(`Error in ${updateUserById.name}`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUserById = async function (req: Request, res: Response) {
    const id = req.params.id;
    const currentUser = req.user as UserDocument;
    if (!id || id !== currentUser._id) {
        return res.sendStatus(400);
    }

    try {
        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.sendStatus(404);
        }

        res.json({ deleteUser });
    } catch (error) {
        console.error(`Error in ${deleteUserById.name}`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        if (!isValidEmail(req.body.email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        if (!(req.body.role === 'Admin' && req.body['admin-code'] === process.env.ADMIN_SECRET)) {
            return res.sendStatus(403);
        }

        const user = new User(req.body);
        const savedUser = await user.save();

        res.json(savedUser);
    } catch (error) {
        console.error(`Error in user ${signUp.name}`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};
