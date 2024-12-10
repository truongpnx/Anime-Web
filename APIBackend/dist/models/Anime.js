"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const animeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    numViews: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    episodesNum: { type: Number, default: 0 },
    genres: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Genre' }],
    isEnded: { type: Boolean, default: false },
    imageUrl: String,
});
// animeSchema.pre('deleteOne', { document: true, query: false }, async (next) => {
//     try {
//         await Comment.deleteMany({ animeId: this._id });
//         console.log(`All comments for anime ${this._id} have been deleted.`);
//         await Episode.deleteMany({ animeId: this._id });
//         console.log(`All episode of anime ${this._id} have been deleted.`);
//         await AnimeDetails.deleteMany({ anime: this._id });
//         console.log(`All details of anime ${this._id} have been deleted.`);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
// animeSchema.post('find', async (docs, next) => {
//     try {
//         docs.map(async (doc) => {
//             await doc.populate({
//                 path: 'genres',
//                 select: 'name -_id',
//                 options: { sort: { name: 1 } },
//             });
//         });
//         next();
//     } catch (error) {
//         next(error);
//     }
// });
const Anime = mongoose_1.default.model('Anime', animeSchema);
exports.default = Anime;
