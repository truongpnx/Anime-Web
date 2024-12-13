"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AnimeDetailsController_1 = require("../controllers/AnimeDetailsController");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', AnimeDetailsController_1.getAnimeDetails);
router.post('/add', AnimeDetailsController_1.addAnimeDetails);
router.post('/update', AnimeDetailsController_1.updateAnimeDetails);
router.delete('/', AnimeDetailsController_1.deleteAnimeDetails);
exports.default = router;
