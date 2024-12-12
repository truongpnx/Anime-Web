import User from '../../User';
import Anime from '../../Anime';
import Comment from '../../Comment';

describe('Comment Model delete', () => {
    beforeEach(async () => {
        const user = await User.create({
            email: 'example@gmail.com',
            userName: 'Example',
            password: 'Password',
        });

        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime Test',
        });

        const commentsContent = ['Nice anime', 'wonderful', 'Desu ka?'];

        await Comment.create(
            commentsContent.map((c) => ({
                userId: user._id,
                animeId: anime._id,
                content: c,
            })),
        );
    });

    test('should delete one comment', async () => {
        const numComments = await Comment.countDocuments();
        let comment = await Comment.findOne();

        expect(comment).toBeDefined();
        await comment?.deleteOne();
        // await Comment.deleteOne({ _id: comment?.id });

        const updatedNumComment = await Comment.countDocuments();
        expect(updatedNumComment).toBe(numComments - 1);
        comment = await Comment.findById(comment?._id);

        expect(comment).toBeNull();
    });

    test('should delete many comments', async () => {
        const numComments = await Comment.countDocuments();
        let commentIDs = await Comment.find().limit(2).select('_id');

        expect(commentIDs).toBeDefined();
        expect(commentIDs).toHaveLength(2);
        await Comment.deleteMany({ _id: { $in: commentIDs } });

        const updatedNumComment = await Comment.countDocuments();
        expect(updatedNumComment).toBe(numComments - 2);
        commentIDs = await Comment.find({ _id: { $in: commentIDs } });

        expect(commentIDs).toHaveLength(0);
    });

    test('should delete a comment and update anime', async () => {
        const anime = await Anime.findOne();

        expect(anime).toBeDefined();
        expect(anime?.numComments).toBeGreaterThan(0);

        const doc = await Comment.findOneAndDelete({ animeId: anime?._id });
        expect(doc).toBeDefined();

        const updatedAnime = await Anime.findById(anime?._id);
        expect(updatedAnime).toBeDefined();
        expect(updatedAnime?.numComments).toBe(anime?.numComments ? anime.numComments - 1 : null);
    });

    test('should delete many comments and update anime', async () => {
        const anime = await Anime.findOne();

        expect(anime).toBeDefined();
        expect(anime?.numComments).toBeGreaterThan(0);

        const res = await Comment.deleteMany({ animeId: anime?._id });
        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(anime?.numComments);

        const updatedAnime = await Anime.findById(anime?._id);
        expect(updatedAnime).toBeDefined();
        expect(updatedAnime?.numComments).toBe(0);
    });
});
