const mongoose = require('mongoose');
const Comment = require('./Comment');
const Episode = require('./Episode');
const AnimeDetails = require('./AnimeDetails');

const animeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    numViews: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    episodesNum: { type: Number, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    isEnded: { type: Boolean, default: false },
    imageUrl: String,
});

animeSchema.pre('deleteOne', { document: true, query: false }, async (next) => {
    try {
        await Comment.deleteMany({ animeId: this._id });
        console.log(`All comments for anime ${this._id} have been deleted.`);
        await Episode.deleteMany({ animeId: this._id });
        console.log(`All episode of anime ${this._id} have been deleted.`);
        await AnimeDetails.deleteMany({ anime: this._id });
        console.log(`All details of anime ${this._id} have been deleted.`);
        next();
    } catch (err) {
        next(err);
    }
});

animeSchema.post('find', async (docs, next) => {
    for (const doc in docs) {
        await doc
            .populate({
                path: 'genres',
                select: 'name -_id',
                options: { sort: { name: 1 } },
            })
            .execPopulate();
    }
    next();
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
