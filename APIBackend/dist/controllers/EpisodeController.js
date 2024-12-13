"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEpisode = exports.updateEpisode = exports.addEpisode = exports.getEpisodeById = exports.getAllEpisode = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Episode_1 = __importDefault(require("../models/Episode"));
const getAllEpisode = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const episodes = await Episode_1.default.find({ animeId: req.params.animeId });
        res.json(episodes);
    }
    catch (error) {
        console.error('Get all anime episode error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
exports.getAllEpisode = getAllEpisode;
const getEpisodeById = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        if (!mongoose_1.default.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }
        const episode = await Episode_1.default.findOne({ _id: req.params.episodeId, animeId: req.params.animeId });
        res.json(episode);
    }
    catch (error) {
        console.error('Get anime episode error', error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
exports.getEpisodeById = getEpisodeById;
const addEpisode = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        const episode = new Episode_1.default({
            ...req.body,
            animeId: req.params.animeId,
        });
        const savedEpisode = await episode.save();
        res.json(savedEpisode);
    }
    catch (error) {
        console.error('Add episode fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.addEpisode = addEpisode;
const updateEpisode = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        if (!mongoose_1.default.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }
        const updatedEpisode = await Episode_1.default.findOneAndUpdate({ _id: req.params.episodeId, animeId: req.params.animeId }, {
            ...req.body,
            animeId: req.params.animeId,
        }, { new: true });
        res.json(updatedEpisode);
    }
    catch (error) {
        console.error('Update episode fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.updateEpisode = updateEpisode;
const deleteEpisode = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.animeId)) {
            return res.status(400).json({ error: 'Invalid Anime Id' });
        }
        if (!mongoose_1.default.isValidObjectId(req.params.episodeId)) {
            return res.status(400).json({ error: 'Invalid Episode Id' });
        }
        const deleteEpisode = await Episode_1.default.findOneAndDelete({ _id: req.params.episodeId, anime: req.params.animeId });
        res.json(deleteEpisode);
    }
    catch (error) {
        console.error('Delete episode fails', error);
        res.status(400).json({ error: error.message });
    }
};
exports.deleteEpisode = deleteEpisode;
