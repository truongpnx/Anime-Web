/** @type {import('mongoose')} */
const mongoose = require('mongoose');
const Anime = require('./Anime');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

genreSchema.pre('deleteOne', { document: true, query: false }, async (next) => {
    try {
        await Anime.updateMany({ genres: this._id }, { $pull: { genres: this._id } });
        next();
    } catch (err) {
        next(err);
    }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
