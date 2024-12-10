"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('express')} */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Episode_1 = __importDefault(require("../models/Episode"));
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("../models/Anime"));
/**
 * [GET] /:animeId
 * Description: Fetch a specific episode or all episode of an anime by `animeId` and `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the episode.
 * URL Parameters:
 *   - animeId (string): The unique ID of the anime.
 */
router.get('/:animeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const animeId = req.params.animeId;
        if (!animeId) {
            return res.status(400).json({ error: 'animeId are required' });
        }
        if (id) {
            const episode = yield Episode_1.default.findOne({
                _id: id,
                animeId: animeId,
            });
            if (!episode) {
                return res.status(404).json({ error: 'Episode not found' });
            }
            console.log(`Episode fetched successfully by animeId: ${animeId}`);
            return res.json(episode);
        }
        const episodes = yield Episode_1.default.find({ animeId: animeId });
        if (!episodes) {
            return res.status(404).json({ error: 'Episodes not found' });
        }
        console.log(`All episodes fetched successfully by animeId: ${animeId}`);
        return res.json(episodes);
    }
    catch (error) {
        console.error('Fail to fetch anime(s)', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
/**
 * [POST] /add
 * Description: Add a specific episode for an anime by `animeId`.
 * Query Parameters:
 *   - animeId (string): The unique ID of the anime.
 */
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = req.query.animeId;
        const data = req.body;
        if (!animeId) {
            return res.status(400).json({ error: 'animeId is required' });
        }
        const anime = yield Anime_1.default.findById(animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }
        const episode = new Episode_1.default(Object.assign(Object.assign({}, data), { animeId: animeId, episodeNum: anime.episodesNum + 1 }));
        console.log(anime);
        console.log(episode);
        yield episode.save();
        console.log(`Add episode successfully to animeId: ${animeId}`);
        res.status(200).json({
            message: 'Episode added successfully',
            episode: episode,
        });
    }
    catch (error) {
        console.error('Fail to add episode', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
/**
 * [POST] /update
 * Description: Update a specific episode for an anime by `animeId` and `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the anime episode.
 *   - animeId (string): The unique ID of the anime.
 */
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = req.query.animeId;
        const episodeId = req.query.id;
        const updates = req.body;
        if (!animeId || !episodeId) {
            return res.status(400).json({ error: 'animeId and episodeId are required' });
        }
        if (!mongoose_1.default.isValidObjectId(episodeId) || !mongoose_1.default.isValidObjectId(animeId)) {
            return res.status(400).json({ error: 'Invalid Anime ID or Invalid Episode ID' });
        }
        const updatedEpisode = yield Episode_1.default.findOneAndUpdate({
            _id: episodeId,
            animeId: animeId,
        }, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedEpisode) {
            return res.status(404).json({ error: 'Episode not found' });
        }
        console.log(`Update episode (id: ${episodeId}) successfully to animeId: ${animeId}`);
        res.status(200).json({
            message: 'Episode updated successfully',
            episode: updatedEpisode,
        });
    }
    catch (error) {
        console.error('Fail to update episode', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
/**
 * [Delete] /
 * Description: Deleta a specific episode for an anime by `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the anime episode.
 */
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: 'episodeId are required' });
        }
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid Episode ID' });
        }
        const episode = yield Episode_1.default.findByIdAndDelete(id);
        console.log(`Delete episode successfully`);
        res.status(200).json({ message: `Episode deleted successfully`, episode: episode });
    }
    catch (error) {
        console.error('Delete epsidoe error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
