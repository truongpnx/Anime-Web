"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const AnimeController_1 = require("../controllers/AnimeController");
const EpisodeRoutes_1 = __importDefault(require("./EpisodeRoutes"));
const AnimeDetailsRoutes_1 = __importDefault(require("./AnimeDetailsRoutes"));
// Anime Routes
router.get('/', AnimeController_1.getAllAnime);
router.get('/:id', AnimeController_1.getAnimeById);
router.post('/add', AnimeController_1.addAnime);
router.post('/:id/update', AnimeController_1.updateAnime);
router.delete('/:id', AnimeController_1.deleteAnime);
router.use('/:animeId/details', AnimeDetailsRoutes_1.default);
router.use('/:animeId/episodes', EpisodeRoutes_1.default);
exports.default = router;
