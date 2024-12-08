/** @type {import('mongoose')} */
const mongoose = require('mongoose');

const animeDetailsSchema = new mongoose.Schema({
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true,
    },
    secondName: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        required: true,
    },
    animeType: {
        type: String,
        default: null,
    },
    studios: {
        type: String,
        default: null,
    },
    airedDate: {
        type: {
            from: {
                type: Date,
                default: Date.now,
            },
            to: {
                type: Date,
                validate: {
                    validator: (value) => !value || value >= this.airedDate.from,
                    message: 'The "to" date must not be less than the "from" date.',
                },
            },
        },
        required: true,
        default: () => ({ from: Date.now(), to: null }),
    },
    rates: {
        type: {
            avg: {
                type: Number,
                required: true,
                default: 0,
                validate: {
                    validator: (value) => value >= 0,
                    message: 'Average rate score must be positive',
                },
            },
            quantity: {
                type: Number,
                required: true,
                default: 0,
                validate: {
                    validator: (value) => value >= 0,
                    message: 'Average rate quantity must be positive',
                },
            },
        },
        required: true,
        default: () => ({ avg: 0, quantity: 0 }),
    },
    quality: {
        type: String,
        required: true,
        default: 'HD',
    }, // video quality
    duration: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: 'Duration must be positive',
        },
    }, // average episode duration in second
});

const AnimeDetails = mongoose.model('AnimeDetaisl', animeDetailsSchema);

module.exports = AnimeDetails;
