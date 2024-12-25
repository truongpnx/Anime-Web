import { Request, Response } from 'express';
import Anime from '../models/Anime';
import mongoose from 'mongoose';
import Genre from '../models/Genre';
import AnimeDetails from '../models/AnimeDetails';

export const getAllAnime = async (req: Request, res: Response) => {
    try {
        const animeList = await Anime.find().populate({
            path: 'genres',
            select: 'name -_id',
            transform: (genre) => genre.name,
        });

        res.json(animeList);
    } catch (error) {
        console.error(`Error in ${getAllAnime.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const getBatchAnimes = async (req: Request, res: Response) => {
    try {
        let batchNum = 0;
        if (req.query['batch-num'] && req.query['batch-num'].toString().match(/^[1-9]\d*$/)) {
            batchNum = Number(req.query['batch-num'].toString());
        }

        let batchSize = 9;
        if (req.query['batch-size'] && req.query['batch-size'].toString().match(/^[1-9]\d*$/)) {
            batchSize = Number(req.query['batch-size'].toString());
        } else {
            return res.sendStatus(400);
        }

        const pipeline: mongoose.PipelineStage[] = [
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genreDetails',
                },
            },
        ];
        if (req.query.genre) {
            pipeline.push({
                $match: {
                    'genreDetails.name': req.query.genre,
                },
            });
        }
        pipeline.push(
            { $skip: batchNum * batchSize },
            { $limit: batchSize },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    displayName: 1,
                    numViews: 1,
                    numComments: 1,
                    episodesNum: 1,
                    genres: '$genreDetails.name',
                    isEnded: 1,
                    imageUrl: 1,
                },
            },
        );

        const animes = await Anime.aggregate(pipeline);
        res.json(animes);
    } catch (error) {
        console.error(`Error in ${getBatchAnimes.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const getAllAnimeByGenre = async (req: Request, res: Response, genre: string) => {
    try {
        const animes = await Anime.aggregate([
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genreDetails',
                },
            },
            {
                $match: {
                    'genreDetails.name': genre,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    displayName: 1,
                    numViews: 1,
                    numComments: 1,
                    episodesNum: 1,
                    genres: '$genreDetails.name',
                    isEnded: 1,
                    imageUrl: 1,
                },
            },
        ]);

        res.json(animes);
    } catch (error) {
        console.error(`Error in ${getAllAnimeByGenre.name}`, error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const countAnimes = async (req: Request, res: Response) => {
    try {
        let queries: Record<string, any> = {};

        if (req.query.genre) {
            const genre = await Genre.findOne({ name: req.query.genre });
            if (genre) {
                queries['genres'] = genre._id;
            } else {
                return res.json({ counts: 0 });
            }
        }

        const counts = await Anime.countDocuments(queries);
        res.json({ counts });
    } catch (error) {
        console.error(`Error in ${countAnimes.name}`, error);
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

        const anime = await Anime.findById(req.params.id).populate({
            path: 'genres',
            select: 'name -_id',
            transform: (genre) => genre.name,
        });
        res.json(anime);
    } catch (error) {
        console.error(`Error in ${getAnimeById.name}`, error);
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
        savedAnime.populate({
            path: 'anime.genres',
            select: 'name -_id',
            transform: (genre) => genre.name,
        });
        res.json(savedAnime);
    } catch (err) {
        console.error(`Error in ${addAnime.name}`, err);
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
            { new: true, runValidators: true },
        );

        if (!updatedAnime) {
            return res.sendStatus(404);
        }

        updatedAnime.populate({
            path: 'anime.genres',
            select: 'name -_id',
            transform: (genre) => genre.name,
        });

        res.json(updatedAnime);
    } catch (err) {
        console.error(`Error in ${updateAnime.name}`, err);
        res.status(400).json({ error: (err as Error).message });
    }
};

export const deleteAnime = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        const deleted = await Anime.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.sendStatus(404);
        }

        deleted.populate({
            path: 'anime.genres',
            select: 'name -_id',
            transform: (genre) => genre.name,
        });

        res.json({ message: 'Anime deleted', deleted });
    } catch (err) {
        console.error(`Error in ${deleteAnime.name}`, err);
        res.status(400).json({ error: (err as Error).message });
    }
};
