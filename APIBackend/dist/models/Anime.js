"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_1 = __importDefault(require("./Comment"));
const Episode_1 = __importDefault(require("./Episode"));
const AnimeDetails_1 = __importDefault(require("./AnimeDetails"));
const stringHelper_1 = require("../helper/stringHelper");
const animeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, unique: true },
    numViews: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    episodesNum: { type: Number, default: 0 },
    genres: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Genre' }],
    isEnded: { type: Boolean, default: false },
    imageUrl: String,
});
animeSchema.pre('save', async function (next) {
    try {
        if (!this.displayName) {
            this.displayName = this.name;
        }
        this.name = (0, stringHelper_1.normalizeAnimeName)(this.name);
        next();
    }
    catch (error) {
        next(error);
    }
});
animeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment_1.default.deleteMany({ animeId: this._id });
        await Episode_1.default.deleteMany({ animeId: this._id });
        await AnimeDetails_1.default.deleteMany({ anime: this._id });
        next();
    }
    catch (err) {
        next(err);
    }
});
animeSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const animeId = await this.model.findOne(this.getQuery(), '_id');
        await Comment_1.default.deleteMany({ animeId: animeId });
        await Episode_1.default.deleteMany({ animeId: animeId });
        await AnimeDetails_1.default.deleteMany({ anime: animeId });
        next();
    }
    catch (err) {
        next(err);
    }
});
animeSchema.pre('deleteMany', async function (next) {
    try {
        const deletedAnimeId = await this.model.find(this.getFilter(), '_id').lean();
        await Promise.all([
            Comment_1.default.deleteMany({ animeId: { $in: deletedAnimeId } }),
            Episode_1.default.deleteMany({ animeId: { $in: deletedAnimeId } }),
            AnimeDetails_1.default.deleteMany({ anime: { $in: deletedAnimeId } }),
        ]);
        next();
    }
    catch (error) {
        next(error);
    }
});
const Anime = mongoose_1.default.model('Anime', animeSchema);
exports.default = Anime;
