import mongoose, { CallbackError, InferSchemaType } from 'mongoose';
import Comment from './Comment';
import Episode from './Episode';
import AnimeDetails from './AnimeDetails';
import { normalizeAnimeName } from '../helper/stringHelper';

const animeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, unique: true },
    numViews: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    episodesNum: { type: Number, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    isEnded: { type: Boolean, default: false },
    imageUrl: String,
});

type AnimeDocument = InferSchemaType<typeof animeSchema> & mongoose.Document;

animeSchema.pre('save', async function (next) {
    try {
        if (!this.displayName) {
            this.displayName = this.name;
        }
        this.name = normalizeAnimeName(this.name);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

animeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment.deleteMany({ animeId: this._id });
        await Episode.deleteMany({ animeId: this._id });
        await AnimeDetails.deleteMany({ anime: this._id });
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

animeSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const animeId = await this.model.findOne(this.getQuery(), '_id');

        await Comment.deleteMany({ animeId: animeId });
        await Episode.deleteMany({ animeId: animeId });
        await AnimeDetails.deleteMany({ anime: animeId });
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

animeSchema.pre('deleteMany', async function (next) {
    try {
        const deletedAnimeId = await this.model.find(this.getFilter(), '_id').lean();

        await Promise.all([
            Comment.deleteMany({ animeId: { $in: deletedAnimeId } }),
            Episode.deleteMany({ animeId: { $in: deletedAnimeId } }),
            AnimeDetails.deleteMany({ anime: { $in: deletedAnimeId } }),
        ]);

        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

const Anime = mongoose.model<AnimeDocument>('Anime', animeSchema);

export default Anime;
