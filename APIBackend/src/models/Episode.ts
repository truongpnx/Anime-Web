import mongoose, { CallbackError, Document, InferSchemaType, Query } from 'mongoose';

import Anime from './Anime';
import Comment from './Comment';

const episodeSchema = new mongoose.Schema({
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
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
type EpisodeDocument = InferSchemaType<typeof episodeSchema> & Document;

episodeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment.deleteMany({ episodeId: this._id });
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

episodeSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const deletedEpId = await this.model.findOne(this.getQuery(), '_id');
        if (deletedEpId) {
            await Comment.deleteMany({ episodeId: deletedEpId });
        }

        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

episodeSchema.post('save', async (doc) => {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: 1 } });
});

episodeSchema.post<EpisodeDocument>('deleteOne', { document: true, query: false }, async function (doc, next) {
    try {
        if (!doc) {
            return next();
        }

        // decrease `episodesNum` for the associated Anime
        await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });

        const episodesToUpdate = await this.model()
            .find({ animeId: doc.animeId, episodeNum: { $gt: doc.episodeNum } })
            .sort({ episodeNum: 1 })
            .lean();

        // Update `episodeNum` one by one to avoid conflicts
        for (const episode of episodesToUpdate) {
            await this.model().findByIdAndUpdate(episode._id, { $inc: { episodeNum: -1 } });
        }
        next();
    } catch (error) {
        console.error('Error updating episode numbers:', error);
        next(error as CallbackError);
    }
});

episodeSchema.post(['deleteOne', 'findOneAndDelete'], async function (doc, next) {
    try {
        if (!doc) {
            return next();
        }

        // decrease `episodesNum` for the associated Anime
        await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });

        const episodesToUpdate = await this.model
            .find({ animeId: doc.animeId, episodeNum: { $gt: doc.episodeNum } })
            .sort({ episodeNum: 1 })
            .lean();

        // Update `episodeNum` one by one to avoid conflicts
        for (const episode of episodesToUpdate) {
            await this.model.findByIdAndUpdate(episode._id, { $inc: { episodeNum: -1 } });
        }

        next();
    } catch (error) {
        console.error('Error post delete middleware episode:', error);
        next(error as CallbackError);
    }
});

interface DeleteManyContext extends Query<any, Document> {
    deletedDocuments?: Array<{ _id: string; animeId: string; episodeNum: number }>;
}

episodeSchema.pre<DeleteManyContext>('deleteMany', async function (next) {
    try {
        this.deletedDocuments = (await this.model
            .find(this.getQuery(), '_id animeId episodeNum')
            .lean()) as unknown as Array<{
            _id: string;
            animeId: string;
            episodeNum: number;
        }>;

        await Comment.deleteMany({ episodeId: { $in: this.deletedDocuments.map((e) => e._id) } });

        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

episodeSchema.post<DeleteManyContext>('deleteMany', async function (res, next) {
    try {
        if (!res.acknowledged || !this.deletedDocuments || this.deletedDocuments.length == 0) {
            return next();
        }

        const updates = this.deletedDocuments.map(async (doc) => {
            await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });

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
    } catch (error) {
        console.error('Error processing deleteMany middleware:', error);
        next(error as CallbackError);
    }
});

// Validation
episodeSchema.index({ animeId: 1, episodeNum: 1 }, { unique: true });

const Episode = mongoose.model('Episode', episodeSchema);

export default Episode;
