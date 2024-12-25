import { Request, Response } from 'express';
import mongoose from 'mongoose';
import AnimeDetails from '../models/AnimeDetails';

export const getAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.sendStatus(400);
        }

        const details = await AnimeDetails.findOne({ anime: req.params.id }).populate({
            path: 'anime',
            select: '-_id',

            populate: {
                path: 'genres',
                select: 'name -_id',
                transform: (genre) => genre.name,
            },
        });

        res.json(details);
    } catch (error) {
        console.error(`Error in ${getAnimeDetails.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const addAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.sendStatus(400);
        }

        const detailsNum = await AnimeDetails.countDocuments({ anime: req.params.id });

        if (detailsNum > 0) {
            return updateAnimeDetails(req, res);
        }

        const details = new AnimeDetails({
            ...req.body,
            anime: req.params.id,
        });

        const savedDetails = await details.save();
        savedDetails.populate({
            path: 'anime',
            select: '-_id',

            populate: {
                path: 'genres',
                select: 'name -_id',
                transform: (genre) => genre.name,
            },
        });
        res.json(savedDetails);
    } catch (error) {
        console.error(`Error in ${addAnimeDetails.name}`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.sendStatus(400);
        }

        const updatedDetails = await AnimeDetails.findOneAndUpdate(
            { anime: req.params.id },
            {
                ...req.body,
                anime: req.params.id,
            },
            { new: true, runValidators: true },
        );
        if (!updatedDetails) {
            return res.sendStatus(404);
        }
        updatedDetails.populate({
            path: 'anime',
            select: '-_id',

            populate: {
                path: 'genres',
                select: 'name -_id',
                transform: (genre) => genre.name,
            },
        });

        res.json(updatedDetails);
    } catch (error) {
        console.error(`Error in ${updateAnimeDetails.name}`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteAnimeDetails = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.sendStatus(400);
        }

        const deleteAnimeDetails = await AnimeDetails.findOneAndDelete({ anime: req.params.id });
        if (!deleteAnimeDetails) {
            return res.sendStatus(404);
        }

        deleteAnimeDetails.populate({
            path: 'anime',
            select: '-_id',

            populate: {
                path: 'genres',
                select: 'name -_id',
                transform: (genre) => genre.name,
            },
        });

        res.json(deleteAnimeDetails);
    } catch (error) {
        console.error(`Error in ${deleteAnimeDetails.name}`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};
