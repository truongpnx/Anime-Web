import Anime from '../../Anime';
import Episode from '../../Episode';

describe('Episode Model create test', () => {
    test('should create a episode', async () => {
        const anime = await Anime.create({
            name: 'Anime Test',
        });

        expect(anime).toBeDefined();

        const episode = await Episode.create({
            animeId: anime._id,
            title: 'Ep 1',
            animeUrl: 'URL',
            episodeNum: 1,
        });

        expect(episode).toBeDefined();

        const docNum = await Episode.countDocuments();
        expect(docNum).toBe(1);
    });

    test('should create many episode', async () => {
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

        const episodes = await Episode.find({ animeId: anime._id });

        expect(episodes).toBeDefined();
        expect(episodes).toHaveLength(epNum);
    });

    test('should update anime when create episode', async () => {
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

        const updatedAnime = await Anime.findById(anime._id);
        expect(updatedAnime).toBeDefined();
        expect(updatedAnime?.episodesNum).toBe(anime.episodesNum + epNum);
    });
});
