import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Episode from '../models/Episode';

export const getAllEpisode = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        const episodes = await Episode.find({ animeId: req.params.animeId });

        res.json(episodes);
    } catch (error) {
        console.error(`Error in ${getAllEpisode.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const countAllEpisode = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        const counts = await Episode.countDocuments({ animeId: req.params.animeId });

        res.json({ counts });
    } catch (error) {
        console.error(`Error in ${countAllEpisode.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const getEpisodeById = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        if (!mongoose.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }

        const episode = await Episode.findOne({ _id: req.params.episodeId, animeId: req.params.animeId });

        res.json(episode);
    } catch (error) {
        console.error('Get anime episode error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const addEpisode = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        const episode = new Episode({
            ...req.body,
            animeId: req.params.animeId,
        });

        const savedEpisode = await episode.save();
        res.json(savedEpisode);
    } catch (error) {
        console.error('Add episode fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateEpisode = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        if (!mongoose.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }

        const updatedEpisode = await Episode.findOneAndUpdate(
            { _id: req.params.episodeId, animeId: req.params.animeId },
            {
                ...req.body,
                animeId: req.params.animeId,
            },
            { new: true },
        );
        res.json(updatedEpisode);
    } catch (error) {
        console.error('Update episode fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteEpisode = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.animeId)) {
            return res.sendStatus(400);
        }

        if (!mongoose.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }

        const deleteEpisode = await Episode.findOneAndDelete({ _id: req.params.episodeId, anime: req.params.animeId });
        res.json(deleteEpisode);
    } catch (error) {
        console.error('Delete episode fails', error);
        res.status(400).json({ error: (error as Error).message });
    }
};
