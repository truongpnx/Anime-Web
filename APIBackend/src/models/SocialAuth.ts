import mongoose from 'mongoose';

const socialAuthSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

const SocialAuth = mongoose.model('SocialAuth', socialAuthSchema);

export default SocialAuth;
