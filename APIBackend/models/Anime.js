const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    numViews: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    episodesNum: { type: Number, default: 0 },
    genres: { type: [String], default: [] },
    isEnded: { type: Boolean, default: false },
    imageUrl: String,
});

module.exports = mongoose.model('Anime', animeSchema);
