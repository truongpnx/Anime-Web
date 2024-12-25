import mongoose, { CallbackError, InferSchemaType } from 'mongoose';
import Comment from './Comment';
import ViewHistory from './ViewHistory';
import { encryptPassword, isValidEmail } from '../helper/stringHelper';
import SocialAuth from './SocialAuth';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: isValidEmail,
            message: (props: { value: string }) => `${props.value} is not a valid email address!`,
        },
        unique: true,
    },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: 'Normal',
        enum: ['Normal', 'Admin'],
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await encryptPassword(this.password);
        }

        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment.deleteMany({ userId: this._id });
        await ViewHistory.deleteMany({ userId: this._id });
        await SocialAuth.deleteMany({ userId: this._id });
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

userSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const deletedUser = await this.model.findOne(this.getQuery(), '_id');

        await Comment.deleteMany({ userId: deletedUser._id });
        await ViewHistory.deleteMany({ userId: deletedUser._id });
        await SocialAuth.deleteMany({ userId: deletedUser._id });

        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

userSchema.pre('deleteMany', async function (next) {
    try {
        const userIds = await this.model.find(this.getQuery(), '_id');

        await Comment.deleteMany({ userId: { $in: userIds.map((e) => e._id) } });
        await ViewHistory.deleteMany({ userId: { $in: userIds.map((e) => e._id) } });
        await SocialAuth.deleteMany({ userId: { $in: userIds.map((e) => e._id) } });

        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

export type UserDocument = InferSchemaType<typeof userSchema> & mongoose.Document;

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
