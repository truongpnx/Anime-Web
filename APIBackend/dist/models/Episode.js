"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("./Anime"));
const Comment_1 = __importDefault(require("./Comment"));
const ViewHistory_1 = __importDefault(require("./ViewHistory"));
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
episodeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment_1.default.deleteMany({ episodeId: this._id });
        await ViewHistory_1.default.deleteMany({ episodeId: this._id });
        next();
    }
    catch (err) {
        next(err);
    }
});
episodeSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const deletedEpId = await this.model.findOne(this.getQuery(), '_id');
        if (deletedEpId) {
            await Comment_1.default.deleteMany({ episodeId: deletedEpId });
            await ViewHistory_1.default.deleteMany({ episodeId: deletedEpId });
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
episodeSchema.post('save', async (doc) => {
    await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: 1 } });
});
episodeSchema.post('deleteOne', { document: true, query: false }, async function (doc, next) {
    try {
        if (!doc) {
            return next();
        }
        // decrease `episodesNum` for the associated Anime
        await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });
        const episodesToUpdate = await this.model()
            .find({ animeId: doc.animeId, episodeNum: { $gt: doc.episodeNum } })
            .sort({ episodeNum: 1 })
            .lean();
        // Update `episodeNum` one by one to avoid conflicts
        for (const episode of episodesToUpdate) {
            await this.model().findByIdAndUpdate(episode._id, { $inc: { episodeNum: -1 } });
        }
        next();
    }
    catch (error) {
        console.error('Error updating episode numbers:', error);
        next(error);
    }
});
episodeSchema.post(['deleteOne', 'findOneAndDelete'], async function (doc, next) {
    try {
        if (!doc) {
            return next();
        }
        // decrease `episodesNum` for the associated Anime
        await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });
        const episodesToUpdate = await this.model
            .find({ animeId: doc.animeId, episodeNum: { $gt: doc.episodeNum } })
            .sort({ episodeNum: 1 })
            .lean();
        // Update `episodeNum` one by one to avoid conflicts
        for (const episode of episodesToUpdate) {
            await this.model.findByIdAndUpdate(episode._id, { $inc: { episodeNum: -1 } });
        }
        next();
    }
    catch (error) {
        console.error('Error post delete middleware episode:', error);
        next(error);
    }
});
episodeSchema.pre('deleteMany', async function (next) {
    try {
        this.deletedDocuments = (await this.model
            .find(this.getQuery(), '_id animeId episodeNum')
            .lean());
        await Comment_1.default.deleteMany({ episodeId: { $in: this.deletedDocuments.map((e) => e._id) } });
        await ViewHistory_1.default.deleteMany({ episodeId: { $in: this.deletedDocuments.map((e) => e._id) } });
        next();
    }
    catch (error) {
        next(error);
    }
});
episodeSchema.post('deleteMany', async function (res, next) {
    try {
        if (!res.acknowledged || !this.deletedDocuments || this.deletedDocuments.length == 0) {
            return next();
        }
        const updates = this.deletedDocuments.map(async (doc) => {
            await Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });
            const episodesToUpdate = await this.model
                .find({ animeId: doc.animeId, episodeNum: { $gt: doc.episodeNum } })
                .sort({ episodeNum: 1 })
                .lean();
            // Update `episodeNum` one by one to avoid conflicts
            for (const episode of episodesToUpdate) {
                await this.model.findByIdAndUpdate(episode._id, { $inc: { episodeNum: -1 } });
            }
        });
        await Promise.all(updates);
        next();
    }
    catch (error) {
        console.error('Error processing deleteMany middleware:', error);
        next(error);
    }
});
// Validation
episodeSchema.index({ animeId: 1, episodeNum: 1 }, { unique: true });
const Episode = mongoose_1.default.model('Episode', episodeSchema);
exports.default = Episode;
