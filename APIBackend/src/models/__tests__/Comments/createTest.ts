import Anime from '../../Anime';
import Comment from '../../Comment';
import User from '../../User';

describe('Comment Model insert', () => {
    test('should create a comment', async () => {
        const user = await User.create({
            email: 'example@gmail.com',
            userName: 'Example',
            password: 'Password',
        });

        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime Test',
        });

        const comment = await Comment.create({
            userId: user._id,
            animeId: anime._id,
            content: 'Test comment',
        });

        const comments = await Comment.find();
        expect(comments).toHaveLength(1);
    });

    test('should create many comments', async () => {
        const commentsContent = ['Nice anime', 'wonderful', 'Desu ka?'];

        const user = await User.create({
            email: 'example@gmail.com',
            userName: 'Example',
            password: 'Password',
        });

        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime Test',
        });

        await Comment.create(
            commentsContent.map((c) => ({
                userId: user._id,
                animeId: anime._id,
                content: c,
            })),
        );

        const comments = await Comment.find();
        expect(comments).toHaveLength(commentsContent.length);
    });

    test('should update anime when add new comments', async () => {
        const commentsContent = ['Nice anime', 'wonderful', 'Desu ka?'];

        const user = await User.create({
            email: 'example@gmail.com',
            userName: 'Example',
            password: 'Password',
        });

        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime Test',
        });

        await Comment.create(
            commentsContent.map((c) => ({
                userId: user._id,
                animeId: anime._id,
                content: c,
            })),
        );

        const updated = await Anime.findById(anime._id);

        expect(updated?.numComments).toBe(anime.numComments + commentsContent.length);
    });
});
