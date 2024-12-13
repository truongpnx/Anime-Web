"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("./Anime"));
const genreSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
});
// document.deleteOne()
genreSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log('Deleting doc!');
    try {
        await Anime_1.default.updateMany({ genres: this._id }, { $pull: { genres: this._id } });
        next();
    }
    catch (err) {
        next(err);
    }
});
genreSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const genreId = await Genre.findOne(this.getQuery()).select('_id');
        await Anime_1.default.updateMany({ genres: genreId }, { $pull: { genres: { $in: [genreId] } } });
        next();
    }
    catch (err) {
        next(err);
    }
});
genreSchema.pre('deleteMany', async function (next) {
    try {
        const genresToDelete = this.getQuery();
        const genres = await Genre.find(genresToDelete).select('_id');
        const genreIds = genres.map((genre) => genre._id);
        // Update all Anime documents to remove references to these genres
        await Anime_1.default.updateMany({ genres: { $in: genreIds } }, { $pull: { genres: { $in: genreIds } } });
        next();
    }
    catch (err) {
        next(err);
    }
});
const Genre = mongoose_1.default.model('Genre', genreSchema);
exports.default = Genre;
