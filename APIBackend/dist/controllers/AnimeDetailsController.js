"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnimeDetails = exports.updateAnimeDetails = exports.addAnimeDetails = exports.getAnimeDetails = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AnimeDetails_1 = __importDefault(require("../models/AnimeDetails"));
const getAnimeDetails = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const details = await AnimeDetails_1.default.findOne({ anime: req.params.animeId }).populate({
            path: 'anime',
            select: '-_id',
            populate: {
                path: 'genres',
                select: 'name -_id',
            },
        });
        res.json(details);
    }
    catch (error) {
        console.error('Get anime details error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
exports.getAnimeDetails = getAnimeDetails;
const addAnimeDetails = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const detailsNum = await AnimeDetails_1.default.countDocuments({ anime: req.params.animeId });
        if (detailsNum > 0) {
            res.redirect('/update');
        }
        const details = new AnimeDetails_1.default({
            ...req.body,
            anime: req.params.animeId,
        });
        const savedDetails = await details.save();
        res.json(savedDetails);
    }
    catch (error) {
        console.error('Add anime details fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.addAnimeDetails = addAnimeDetails;
const updateAnimeDetails = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const updatedDetails = await AnimeDetails_1.default.findOneAndUpdate({ anime: req.params.animeId }, {
            ...req.body,
            anime: req.params.animeId,
        }, { new: true });
        res.json(updatedDetails);
    }
    catch (error) {
        console.error('Update anime details fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.updateAnimeDetails = updateAnimeDetails;
const deleteAnimeDetails = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const deleteAnimeDetails = await AnimeDetails_1.default.findOneAndDelete({ anime: req.params.animeId });
        res.json(deleteAnimeDetails);
    }
    catch (error) {
        console.error('Delete anime details fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.deleteAnimeDetails = deleteAnimeDetails;
