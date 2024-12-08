/** @type {import('mongoose')} */
const mongoose = require('mongoose');
const Anime = require('./Anime');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

// document.deleteOne()
genreSchema.pre('deleteOne', { document: true, query: false }, async function () {
    console.log('Deleting doc!');
    try {
        await Anime.updateMany({ genres: this._id }, { $pull: { genres: this._id } });
        next();
    } catch (err) {
        next(err);
    }
});

genreSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const genreId = await Genre.findOne(this.getQuery()).select('_id');

        await Anime.updateMany({ genres: genreId }, { $pull: { genres: { $in: [genreId] } } });

        next();
    } catch (err) {
        next(err);
    }
});

genreSchema.pre('deleteMany', async function (next) {
    try {
        const genresToDelete = this.getQuery();

        const genres = await Genre.find(genresToDelete).select('_id');
        const genreIds = genres.map((genre) => genre._id);

        // Update all Anime documents to remove references to these genres
        await Anime.updateMany({ genres: { $in: genreIds } }, { $pull: { genres: { $in: genreIds } } });

        next();
    } catch (err) {
        next(err);
    }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
