"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("./Anime"));
const commentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'User' },
    animeId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'Anime' },
    episodeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Episode' },
    createAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
}, { timestamps: true });
commentSchema.post('save', async function (doc) {
    await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { numComments: 1 } });
});
commentSchema.post('deleteOne', { document: true, query: false }, async function (doc, next) {
    await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
    next();
});
commentSchema.post(['deleteOne', 'findOneAndDelete'], async function (doc, next) {
    await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
    next();
});
commentSchema.pre('deleteMany', async function (next) {
    try {
        this.deletedComments = (await this.model.find(this.getFilter(), 'animeId').lean());
        next();
    }
    catch (error) {
        next(error);
    }
});
commentSchema.post('deleteMany', async function (res, next) {
    try {
        if (!res.acknowledged || !this.deletedComments || this.deletedComments.length == 0) {
            return next();
        }
        // Create a map of animeIds and the number of comments to decrement
        const animeUpdates = this.deletedComments.reduce((map, comment) => {
            const animeId = comment.animeId.toString();
            map[animeId] = (map[animeId] || 0) - 1;
            return map;
        }, {});
        // Perform a bulk update for all affected anime
        await Promise.all(Object.entries(animeUpdates).map(([animeId, decrement]) => Anime_1.default.findByIdAndUpdate(animeId, { $inc: { numComments: decrement } })));
        next();
    }
    catch (error) {
        next(error);
    }
});
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
