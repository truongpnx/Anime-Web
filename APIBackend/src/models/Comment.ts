import mongoose, { CallbackError, Document, InferSchemaType, Query } from 'mongoose';
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

type CommentDocument = InferSchemaType<typeof commentSchema> & Document;

commentSchema.post('save', async function (doc) {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { numComments: 1 } });
});

commentSchema.post('deleteOne', { document: true, query: false }, async function (doc, next) {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
    next();
});

commentSchema.post(['deleteOne', 'findOneAndDelete'], async function (doc, next) {
    await Anime.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
    next();
});

interface DeleteManyContext extends Query<any, Document> {
    deletedComments?: Array<{ animeId: string }>;
}

commentSchema.pre<DeleteManyContext>('deleteMany', async function (next) {
    try {
        this.deletedComments = (await this.model.find(this.getFilter(), 'animeId').lean()) as unknown as Array<{
            animeId: string;
        }>;
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

commentSchema.post<DeleteManyContext>('deleteMany', async function (res, next) {
    try {
        if (!res.acknowledged || !this.deletedComments || this.deletedComments.length == 0) {
            return next();
        }

        // Create a map of animeIds and the number of comments to decrement
        const animeUpdates = this.deletedComments.reduce((map, comment) => {
            const animeId = comment.animeId.toString();
            map[animeId] = (map[animeId] || 0) - 1;
            return map;
        }, {} as Record<string, number>);

        // Perform a bulk update for all affected anime
        await Promise.all(
            Object.entries(animeUpdates).map(([animeId, decrement]) =>
                Anime.findByIdAndUpdate(animeId, { $inc: { numComments: decrement } }),
            ),
        );
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
