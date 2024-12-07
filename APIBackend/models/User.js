/** @type {import('mongoose')} */
const mongoose = require('mongoose');
const Comment = require('./Comment');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.pre('deleteOne', { document: true, query: false }, async (next) => {
    try {
        await Comment.deleteMany({ userId: this._id });
        console.log(`All comments for user ${this._id} have been deleted.`);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
