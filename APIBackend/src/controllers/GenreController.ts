import { Request, Response } from 'express';
import Genre from '../models/Genre';
import mongoose from 'mongoose';

export const getAllGenre = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        console.error('Error get all genre', error);
        res.status(500).json({
            error: 'Intenal Server Error',
        });
    }
};

export const getGenreById = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }

        const genre = await Genre.findById(req.params.id);
        res.json(genre);
    } catch (error) {
        console.error('Error get a genre', error);
        res.status(500).json({
            error: 'Intenal Server Error',
        });
    }
};

export const addGenre = async (req: Request, res: Response) => {
    try {
        const genre = new Genre(req.body);
        const savedGenre = await genre.save();
        res.json(savedGenre);
    } catch (err) {
        console.error('Add anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }

        const updatedGerne = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGerne);
    } catch (err) {
        console.error('Update anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }
        await Genre.findByIdAndDelete(req.params.id);
        res.json({ message: 'Genre deleted.' });
    } catch (err) {
        console.error('Delete anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};
