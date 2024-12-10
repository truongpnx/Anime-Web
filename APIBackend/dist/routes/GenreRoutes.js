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
const Genre_1 = __importDefault(require("../models/Genre"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield Genre_1.default.find();
        res.json(genres);
    }
    catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name || name === '') {
            return res.status(400).json({ error: 'Empty genre name' });
        }
        const genre = yield Genre_1.default.create({ name: name });
        res.json({ message: 'Add genre completed', genre: genre });
    }
    catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        if (!name || name === '') {
            return res.status(400).json({ error: 'Empty genre name' });
        }
        const genre = yield Genre_1.default.findOneAndDelete({ name: name });
        res.json({ message: 'Delete genre completed', genre: genre });
    }
    catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
