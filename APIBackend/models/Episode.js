const Anime = require('./Anime');

/** @type {import('mongoose')} */
const mongoose = require('mongoose');

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

episodeSchema.post('save', async (doc) => {
    console.log('Post save');
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: 1 } });
});

episodeSchema.post('deleteOne', async (doc) => {
    try {
        // decrease `episodesNum` for the associated Anime
        await Anime.findByIdAndUpdate(doc.animeId, { $inc: { episodesNum: -1 } });

        // Decrement `episodeNum` for episodes with a higher number
        await this.updateMany(
            {
                animeId: doc.animeId,
                episodeNum: { $gt: doc.episodeNum },
            },
            {
                $inc: { episodeNum: -1 },
            },
        );
    } catch (error) {
        console.error('Error updating episode numbers:', error);
    }
});

// Validation
episodeSchema.index({ animeId: 1, episodeNum: 1 }, { unique: true });

const Episode = mongoose.model('Episode', episodeSchema);

// Episode.collection.dropIndex('animeId_1_episodeNum_1');

module.exports = Episode;
