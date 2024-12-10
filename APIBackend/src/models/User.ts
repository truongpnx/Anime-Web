import mongoose, { CallbackError } from 'mongoose';
import Comment from './Comment';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment.deleteMany({ userId: this._id });
        console.log(`All comments for user ${this._id} have been deleted.`);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

userSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const deletedUserId = await User.findOne(this.getQuery()).select('_id');

        await Comment.deleteMany({ userId: deletedUserId });
        console.log(`All comments for user ${deletedUserId} have been deleted.`);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

userSchema.pre('deleteMany', async function (next) {
    try {
        const userIds = await User.find(this.getQuery()).select('_id');

        await Comment.deleteMany({ userId: { $in: userIds } });
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
