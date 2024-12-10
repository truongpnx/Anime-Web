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
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("./Anime"));
const Comment_1 = __importDefault(require("./Comment"));
const episodeSchema = new mongoose_1.default.Schema({
    animeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Anime',
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: 'Unknown',
    },
    episodeNum: {
        type: Number,
        required: true,
    },
    animeUrl: {
        type: String,
        required: true,
    },
    airDate: {
        type: Date,
        default: null,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
// Middleware
episodeSchema.pre('deleteOne', { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Comment_1.default.deleteMany({ episodeId: this._id });
            console.log(`All comments for episode ${this._id} have been deleted.`);
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
episodeSchema.post('save', (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: 1 } });
}));
episodeSchema.post('deleteOne', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // decrease `episodesNum` for the associated Anime
            yield Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });
            // Decrement `episodeNum` for episodes with a higher number
            yield this.updateMany({
                animeId: doc.animeId,
                episodeNum: { $gt: doc.episodeNum },
            }, {
                $inc: { episodeNum: -1 },
            });
        }
        catch (error) {
            console.error('Error updating episode numbers:', error);
        }
    });
});
// Validation
episodeSchema.index({ animeId: 1, episodeNum: 1 }, { unique: true });
const Episode = mongoose_1.default.model('Episode', episodeSchema);
exports.default = Episode;
