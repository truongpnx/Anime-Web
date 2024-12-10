import mongoose from 'mongoose';
import Anime from './Anime';

const commentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        animeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Anime' },
        episodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
        createAt: { type: Date, default: Date.now },
        content: { type: String, required: true },
    },
    { timestamps: true },
);

commentSchema.post('save', async (doc) => {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { numComments: 1 } });
});

commentSchema.post('deleteOne', async (doc) => {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
