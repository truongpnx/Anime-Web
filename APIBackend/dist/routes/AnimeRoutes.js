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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Anime_1 = __importDefault(require("../models/Anime"));
const stringHelper_1 = require("../helper/stringHelper");
const mongoose_1 = __importDefault(require("mongoose"));
// [GET] '/?id='
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.query.id;
        if (mongoose_1.default.isValidObjectId(id)) {
            const anime = yield Anime_1.default.findById(id);
            return res.json(anime);
        }
        const animes = yield Anime_1.default.find();
        res.json(animes);
    }
    catch (error) {
        console.error('Fetch animes error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// [GET] /:name
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = (0, stringHelper_1.normalizeAnimeName)(req.params.name);
        const anime = yield Anime_1.default.findOne({ name: name });
        if (anime) {
            console.log('Find anime success');
            return res.status(200).json(anime);
        }
        res.status(404).json('Not found anime');
    }
    catch (error) {
        console.error('Not found anime', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// [POST] /add
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        if (!data.name) {
            return res.status(400).json({ error: 'Empty anime name' });
        }
        let name = (0, stringHelper_1.normalizeAnimeName)(data.name);
        let anime = yield Anime_1.default.findOne({ name: name });
        if (anime) {
            console.log('Existed anime');
            res.status(409).json({ error: 'Existed anime', anime: anime });
            return;
        }
        anime = new Anime_1.default(Object.assign(Object.assign({}, data), { name: name, displayName: data.name, isEnded: Boolean(data.isEnded) }));
        yield anime.save();
        console.log('Add anime success');
        res.status(200).json({
            message: 'Anime added successfully',
            anime: anime,
        });
    }
    catch (error) {
        console.error('Fail to add anime', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// [POST] /update?id=
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        let updates = req.body;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        if (updates.name !== undefined) {
            updates.displayName = updates.name;
            updates.name = (0, stringHelper_1.normalizeAnimeName)(updates.name);
        }
        updates.isEnded = Boolean(updates.isEnded);
        const updatedAnime = yield Anime_1.default.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedAnime) {
            return res.status(404).json({ error: 'Anime not found' });
        }
        res.status(200).json({
            message: 'Anime updated successfully',
            anime: updatedAnime,
        });
    }
    catch (error) {
        console.error('Update anime error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// [DELETE] /?id=
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(400).json('Empty id');
        }
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }
        const anime = yield Anime_1.default.findByIdAndDelete(id);
        console.log('Delete anime successfully');
        res.status(200).json({ message: 'Anime deleted successfully', anime: anime });
    }
    catch (error) {
        console.error('Delete error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
