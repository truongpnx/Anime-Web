import { Request, Response } from 'express';
import Anime from '../models/Anime';
import mongoose from 'mongoose';
import Genre from '../models/Genre';

export const getAllAnime = async (req: Request, res: Response) => {
    try {
        const animeList = await Anime.find().populate({ path: 'genres', select: 'name -_id' });
        res.json(animeList);
    } catch (error) {
        console.error('Get all anime error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const getAnimeById = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }

        const anime = await Anime.findById(req.params.id).populate({ path: 'genres', select: 'name -_id' });
        res.json(anime);
    } catch (error) {
        console.error('Get an anime error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const addAnime = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find({ name: { $in: req.body.genres } }, '_id').lean();

        const anime = new Anime({ ...req.body, genres: genres.map((e) => e._id) });
        const savedAnime = await anime.save();
        res.json(savedAnime);
    } catch (err) {
        console.error('Add anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};

export const updateAnime = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        const genres = await Genre.find({ name: { $in: req.body.genres } }, '_id').lean();

        const updatedAnime = await Anime.findByIdAndUpdate(
            req.params.id,
            { ...req.body, genres: genres.map((e) => e._id) },
            { new: true },
        );
        res.json(updatedAnime);
    } catch (err) {
        console.error('Update anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};

export const deleteAnime = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        await Anime.findByIdAndDelete(req.params.id);
        res.json({ message: 'Anime deleted.' });
    } catch (err) {
        console.error('Delete anime error', err);
        res.status(400).json({ error: (err as Error).message });
    }
};
