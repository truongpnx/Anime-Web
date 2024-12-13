"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EpisodeController_1 = require("../controllers/EpisodeController");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', EpisodeController_1.getAllEpisode);
router.get('/:episodeId', EpisodeController_1.getEpisodeById);
router.post('/add', EpisodeController_1.addEpisode);
router.post('/update', EpisodeController_1.updateEpisode);
router.delete('/:episodeId', EpisodeController_1.deleteEpisode);
exports.default = router;
