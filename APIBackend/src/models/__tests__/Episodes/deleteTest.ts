import Anime from '../../Anime';
import Comment from '../../Comment';
import Episode from '../../Episode';
import User from '../../User';
import ViewHistory from '../../ViewHistory';

describe('Episode Model delete test', () => {
    test('should delete a episode', async () => {
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create({
            animeId: anime._id,
            title: 'Ep 1',
            animeUrl: 'URL',
            episodeNum: 1,
        });

        const episode = await Episode.findOne({ animeId: anime._id });
        expect(episode).toBeDefined();

        await episode?.deleteOne();

        const deletedEp = await Episode.findById(episode?._id);
        expect(deletedEp).toBeNull();
    });

    test('should delete many episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const episodes = await Episode.find({ animeId: anime._id }).limit(2);

        expect(episodes).toBeDefined();
        expect(episodes).toHaveLength(2);

        await Episode.deleteMany({ _id: { $in: episodes.map((ep) => ep._id) } });

        episodes.forEach(async (ep) => {
            const deleted = await Episode.findById(ep._id);
            expect(deleted).toBeNull;
        });
    });

    test('should update anime when delete a episode', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const episode = await Episode.findOneAndDelete({ animeId: anime._id });
        expect(episode).toBeDefined();

        const updatedAnime = await Anime.findById(anime._id);
        expect(updatedAnime).toBeDefined();
        expect(updatedAnime?.episodesNum).toBe(anime.episodesNum + epNum - 1);
    });

    test('should update anime when delete many episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const res = await Episode.deleteMany({ episodeNum: { $in: [1, 3, 5] } });
        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(3);

        const updatedAnime = await Anime.findById(anime._id);
        expect(updatedAnime).toBeDefined();
        expect(updatedAnime?.episodesNum).toBe(anime.episodesNum + epNum - 3);
    });

    test('should update larger episodes when delete a episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const deleteEpNum = 2;
        const oriEpisodes = await Episode.find({ episodeNum: { $gt: deleteEpNum } }).sort({ episodeNum: 1 });

        await Episode.findOneAndDelete({ episodeNum: deleteEpNum });

        const updatedEpisodes = await Episode.find({ _id: { $in: oriEpisodes.map((e) => e._id) } }).sort({
            episodeNum: 1,
        });

        oriEpisodes.forEach((e, index) => {
            expect(updatedEpisodes[index]._id).toEqual(e._id);
            expect(updatedEpisodes[index].episodeNum).toBe(e.episodeNum - 1);
        });
    });

    test('should update larger episodes when delete many episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const deleteEpNums = [2, 4];

        const deletedEps = await Episode.find({ episodeNum: { $in: deleteEpNums } });

        const res = await Episode.deleteMany({ episodeNum: { $in: deleteEpNums } });

        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(deleteEpNums.length);

        const checkEps = await Episode.find({ _id: { $in: deletedEps.map((e) => e._id) } });

        expect(checkEps).toHaveLength(0);

        const remainEps = await Episode.find({ animeId: anime._id }).sort({ episdoeNum: 1 });

        for (let index = 0; index < epNum - deleteEpNums.length; index++) {
            expect(remainEps[index].episodeNum).toBe(index + 1);
        }
    });

    test('should not delete a episode when wrong query', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const episode = await Episode.findOneAndDelete({ episodeNum: epNum + 1 });
        expect(episode).toBeNull();
    });

    test('should not delete many episode when wrong query', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const res = await Episode.deleteMany({ episodeNum: { $gt: epNum } });
        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(0);
    });

    test('should delete comment when delete an episode (query)', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        const commentContents = ['yaeh', 'good', 'nice', 'awesome'];

        await Promise.all(
            episodes.map(async (ep) => {
                await Comment.create(
                    commentContents.map((e) => ({
                        animeId: anime._id,
                        userId: user._id,
                        episodeId: ep._id,
                        content: e,
                    })),
                );
            }),
        );

        const numComment = await Comment.countDocuments();
        expect(numComment).toBe(episodes.length * commentContents.length);

        const deleteEp = await Episode.findOneAndDelete({ episodeNum: 1 });

        expect(deleteEp).toBeDefined();

        const deletedComments = await Comment.find({ episodeId: deleteEp?._id });
        expect(deletedComments).toHaveLength(0);
    });

    test('should delete comment when delete an episode (document)', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        const commentContents = ['yaeh', 'good', 'nice', 'awesome'];

        await Promise.all(
            episodes.map(async (ep) => {
                await Comment.create(
                    commentContents.map((e) => ({
                        animeId: anime._id,
                        userId: user._id,
                        episodeId: ep._id,
                        content: e,
                    })),
                );
            }),
        );

        const numComment = await Comment.countDocuments();
        expect(numComment).toBe(episodes.length * commentContents.length);

        const deleteEp = await Episode.findOne({ episodeNum: 1 });

        expect(deleteEp).toBeDefined();

        await deleteEp?.deleteOne();

        const deletedComments = await Comment.find({ episodeId: deleteEp?._id });
        expect(deletedComments).toHaveLength(0);
    });

    test('should delete comment when delete many episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        const commentContents = ['yaeh', 'good', 'nice', 'awesome'];

        await Promise.all(
            episodes.map(async (ep) => {
                await Comment.create(
                    commentContents.map((e) => ({
                        animeId: anime._id,
                        userId: user._id,
                        episodeId: ep._id,
                        content: e,
                    })),
                );
            }),
        );

        const numComment = await Comment.countDocuments();
        expect(numComment).toBe(episodes.length * commentContents.length);

        const deletedEps = await Episode.find({ episodeNum: { $in: [2, 4] } });
        const res = await Episode.deleteMany({ episodeNum: { $in: [2, 4] } });

        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(2);

        const deletedComments = await Comment.find({ episodeId: { $in: deletedEps.map((ep) => ep._id) } });
        expect(deletedComments).toHaveLength(0);
    });

    test('should delete view history when delete an episode (query)', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        await Promise.all(
            episodes.map(async (ep) => {
                await ViewHistory.create({
                    userId: user._id,
                    episodeId: ep._id,
                    watchTime: 10,
                });
            }),
        );

        const numHistory = await ViewHistory.countDocuments();
        expect(numHistory).toBe(episodes.length);

        const deleteEp = await Episode.findByIdAndDelete(episodes[0]._id);

        expect(deleteEp).toBeDefined();

        const deletedComments = await ViewHistory.find({ episodeId: deleteEp?._id });
        expect(deletedComments).toHaveLength(0);
    });

    test('should delete comment when delete an episode (document)', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        await Promise.all(
            episodes.map(async (ep) => {
                await ViewHistory.create({
                    userId: user._id,
                    episodeId: ep._id,
                    watchTime: 10,
                });
            }),
        );

        const numHistory = await ViewHistory.countDocuments();
        expect(numHistory).toBe(episodes.length);

        const deleteEp = await Episode.findOne();

        expect(deleteEp).toBeDefined();

        await deleteEp?.deleteOne();

        const deletedComments = await ViewHistory.find({ episodeId: deleteEp?._id });
        expect(deletedComments).toHaveLength(0);
    });

    test('should delete comment when delete many episodes', async () => {
        const epNum = 5;
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episodes = await Episode.create(
            Array.from({ length: epNum }).map((_, index) => ({
                animeId: anime._id,
                title: `Ep ${index + 1}`,
                animeUrl: 'URL',
                episodeNum: index + 1,
            })),
        );

        const user = await User.create({
            email: 'email@example.com',
            userName: 'user',
            password: 'password',
        });

        await Promise.all(
            episodes.map(async (ep) => {
                await ViewHistory.create({
                    userId: user._id,
                    episodeId: ep._id,
                    watchTime: 10,
                });
            }),
        );

        const numHistory = await ViewHistory.countDocuments();
        expect(numHistory).toBe(episodes.length);

        const deletedEps = await Episode.find({ _id: { $in: episodes.slice(0, 2).map((e) => e._id) } });
        const res = await Episode.deleteMany({ _id: { $in: episodes.slice(0, 2).map((e) => e._id) } });

        expect(res.acknowledged).toBe(true);
        expect(res.deletedCount).toBe(2);

        const deletedComments = await ViewHistory.find({ episodeId: { $in: deletedEps.map((ep) => ep._id) } });
        expect(deletedComments).toHaveLength(0);
    });
});
