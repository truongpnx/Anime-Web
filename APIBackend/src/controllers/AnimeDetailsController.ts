import { Request, Response } from 'express';
import mongoose from 'mongoose';
import AnimeDetails from '../models/AnimeDetails';

export const getAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }

        const details = await AnimeDetails.findOne({ anime: req.params.animeId }).populate({
            path: 'anime',
            select: '-_id',

            populate: {
                path: 'genres',
                select: 'name -_id',
            },
        });

        res.json(details);
    } catch (error) {
        console.error('Get anime details error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const addAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }

        const detailsNum = await AnimeDetails.countDocuments({ anime: req.params.animeId });

        if (detailsNum > 0) {
            res.redirect('/update');
        }

        const details = new AnimeDetails({
            ...req.body,
            anime: req.params.animeId,
        });

        const savedDetails = await details.save();
        res.json(savedDetails);
    } catch (error) {
        console.error('Add anime details fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }

        const updatedDetails = await AnimeDetails.findOneAndUpdate(
            { anime: req.params.animeId },
            {
                ...req.body,
                anime: req.params.animeId,
            },
            { new: true },
        );
        res.json(updatedDetails);
    } catch (error) {
        console.error('Update anime details fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }

        const deleteAnimeDetails = await AnimeDetails.findOneAndDelete({ anime: req.params.animeId });
        res.json(deleteAnimeDetails);
    } catch (error) {
        console.error('Delete anime details fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};
