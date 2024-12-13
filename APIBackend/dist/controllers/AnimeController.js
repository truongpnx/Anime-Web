"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnime = exports.updateAnime = exports.addAnime = exports.getAnimeById = exports.getAllAnime = void 0;
const Anime_1 = __importDefault(require("../models/Anime"));
const mongoose_1 = __importDefault(require("mongoose"));
const Genre_1 = __importDefault(require("../models/Genre"));
const getAllAnime = async (req, res) => {
    try {
        const animeList = await Anime_1.default.find().populate({ path: 'genres', select: 'name -_id' });
        res.json(animeList);
    }
    catch (error) {
        console.error('Get all anime error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
exports.getAllAnime = getAllAnime;
const getAnimeById = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        const anime = await Anime_1.default.findById(req.params.id).populate({ path: 'genres', select: 'name -_id' });
        res.json(anime);
    }
    catch (error) {
        console.error('Get an anime error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
exports.getAnimeById = getAnimeById;
const addAnime = async (req, res) => {
    try {
        const genres = await Genre_1.default.find({ name: { $in: req.body.genres } }, '_id').lean();
        const anime = new Anime_1.default({ ...req.body, genres: genres.map((e) => e._id) });
        const savedAnime = await anime.save();
        res.json(savedAnime);
    }
    catch (err) {
        console.error('Add anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.addAnime = addAnime;
const updateAnime = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        const genres = await Genre_1.default.find({ name: { $in: req.body.genres } }, '_id').lean();
        const updatedAnime = await Anime_1.default.findByIdAndUpdate(req.params.id, { ...req.body, genres: genres.map((e) => e._id) }, { new: true });
        res.json(updatedAnime);
    }
    catch (err) {
        console.error('Update anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.updateAnime = updateAnime;
const deleteAnime = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        await Anime_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Anime deleted.' });
    }
    catch (err) {
        console.error('Delete anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.deleteAnime = deleteAnime;
