"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.addGenre = exports.getGenreById = exports.getAllGenre = void 0;
const Genre_1 = __importDefault(require("../models/Genre"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllGenre = async (req, res) => {
    try {
        const genres = await Genre_1.default.find();
        res.json(genres);
    }
    catch (error) {
        console.error('Error get all genre', error);
        res.status(500).json({
            error: 'Intenal Server Error',
        });
    }
};
exports.getAllGenre = getAllGenre;
const getGenreById = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }
        const genre = await Genre_1.default.findById(req.params.id);
        res.json(genre);
    }
    catch (error) {
        console.error('Error get a genre', error);
        res.status(500).json({
            error: 'Intenal Server Error',
        });
    }
};
exports.getGenreById = getGenreById;
const addGenre = async (req, res) => {
    try {
        const genre = new Genre_1.default(req.body);
        const savedGenre = await genre.save();
        res.json(savedGenre);
    }
    catch (err) {
        console.error('Add anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.addGenre = addGenre;
const updateGenre = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }
        const updatedGerne = await Genre_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGerne);
    }
    catch (err) {
        console.error('Update anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.updateGenre = updateGenre;
const deleteGenre = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Genre ID' });
        }
        await Genre_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Genre deleted.' });
    }
    catch (err) {
        console.error('Delete anime error', err);
        res.status(400).json({ error: err.message });
    }
};
exports.deleteGenre = deleteGenre;
