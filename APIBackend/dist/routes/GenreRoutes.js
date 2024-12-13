"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenreController_1 = require("../controllers/GenreController");
const router = express_1.default.Router();
router.get('/', GenreController_1.getAllGenre);
router.get('/:id', GenreController_1.getGenreById);
router.post('/add', GenreController_1.addGenre);
router.post('/:id/update', GenreController_1.updateGenre);
router.delete('/:id', GenreController_1.deleteGenre);
exports.default = router;
