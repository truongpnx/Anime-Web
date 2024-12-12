import Anime from '../../Anime';
import AnimeDetails from '../../AnimeDetails';
import Comment from '../../Comment';
import Episode from '../../Episode';
import User from '../../User';

describe('Anime Model delete test', () => {
    test('should delete an anime (document)', async () => {
        await Anime.create({
            name: 'anime',
        });

        const anime = await Anime.findOne();
        expect(anime).toBeDefined();
        expect(anime?.name).toBe('anime');

        await anime?.deleteOne();

        const deleted = await Anime.findById(anime?._id);
        expect(deleted).toBeNull();
    });

    test('should delete an anime (query)', async () => {
        await Anime.create({
            name: 'anime',
        });

        const anime = await Anime.findOneAndDelete({ name: 'anime' });
        expect(anime).toBeDefined();
        expect(anime?.name).toBe('anime');

        const deleted = await Anime.findById(anime?._id);
        expect(deleted).toBeNull();
    });

    test('should delete comments of anime when delete it', async () => {
        const anime = await Anime.create({
            name: 'anime',
        });

        const commentsContent = ['Yeah', 'Awesome', 'Magnifition'];
        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        await Comment.create(
            commentsContent.map((e) => ({
                animeId: anime._id,
                userId: user._id,
                content: e,
            })),
        );

        let commentNum = await Comment.countDocuments({ animeId: anime._id });
        expect(commentNum).toEqual(commentsContent.length);

        await anime.deleteOne();

        commentNum = await Comment.countDocuments({ animeId: anime._id });
        expect(commentNum).toEqual(0);
    });

    test('should delete comments of animes when delete them', async () => {
        const animeNames = ['Anime 1', 'Anime 2', 'Anime 3'];
        const animes = await Anime.create(
            animeNames.map((e) => ({
                name: e,
            })),
        );

        const commentsContent = ['Yeah', 'Awesome', 'Magnifition'];
        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        await Promise.all(
            animes.map(async (anime) => {
                await Comment.create(
                    commentsContent.map((e) => ({
                        animeId: anime._id,
                        userId: user._id,
                        content: e,
                    })),
                );
            }),
        );

        let commentNum = await Comment.countDocuments();
        expect(commentNum).toEqual(commentsContent.length * animeNames.length);

        await Anime.deleteMany();

        commentNum = await Comment.countDocuments();
        expect(commentNum).toEqual(0);
    });

    test('should delete episodes of anime when delete it', async () => {
        const anime = await Anime.create({
            name: 'anime',
        });

        const episodeNums = 5;

        await Episode.create(
            Array.from({ length: episodeNums }).map((_, idx) => ({
                animeId: anime._id,
                title: `Ep ${idx + 1}`,
                animeUrl: 'URL',
                episodeNum: idx + 1,
            })),
        );

        let episodeDocNum = await Episode.countDocuments({ animeId: anime._id });
        expect(episodeDocNum).toEqual(episodeNums);

        await anime.deleteOne();

        episodeDocNum = await Episode.countDocuments({ animeId: anime._id });
        expect(episodeDocNum).toEqual(0);
    });

    test('should delete episodes of animes when delete them', async () => {
        const animeNames = ['Anime 1', 'Anime 2', 'Anime 3'];
        const animes = await Anime.create(
            animeNames.map((e) => ({
                name: e,
            })),
        );

        const episodeNums = 5;

        await Promise.all(
            animes.map(async (anime) => {
                await Episode.create(
                    Array.from({ length: episodeNums }).map((_, idx) => ({
                        animeId: anime._id,
                        title: `Ep ${idx + 1}`,
                        animeUrl: 'URL',
                        episodeNum: idx + 1,
                    })),
                );
            }),
        );

        let episodeDocNum = await Episode.countDocuments();
        expect(episodeDocNum).toEqual(episodeNums * animeNames.length);

        await Anime.deleteMany();

        episodeDocNum = await Episode.countDocuments();
        expect(episodeDocNum).toEqual(0);
    });

    test('should delete details of anime when delete it', async () => {
        const anime = await Anime.create({
            name: 'anime',
        });

        await AnimeDetails.create({
            anime: anime._id,
            description: 'This is an anime',
        });

        let detailsNum = await AnimeDetails.countDocuments({ anime: anime._id });
        expect(detailsNum).toEqual(1);

        await anime.deleteOne();

        detailsNum = await AnimeDetails.countDocuments({ anime: anime._id });
        expect(detailsNum).toEqual(0);
    });

    test('should delete episodes of animes when delete them', async () => {
        const animeNames = ['Anime 1', 'Anime 2', 'Anime 3'];
        const animes = await Anime.create(
            animeNames.map((e) => ({
                name: e,
            })),
        );

        await Promise.all(
            animes.map(async (anime) => {
                await AnimeDetails.create({
                    anime: anime._id,
                    description: 'This is an anime',
                });
            }),
        );

        let detailsNum = await AnimeDetails.countDocuments();
        expect(detailsNum).toEqual(animeNames.length);

        await Anime.deleteMany();

        detailsNum = await AnimeDetails.countDocuments();
        expect(detailsNum).toEqual(0);
    });
});
