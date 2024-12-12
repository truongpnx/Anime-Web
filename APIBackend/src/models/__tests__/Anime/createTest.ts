import Anime from '../../Anime';

describe('Anime Model create test', () => {
    test('should create an anime', async () => {
        const anime = await Anime.create({
            name: 'Anime test',
        });

        expect(anime).toBeDefined();

        const createdAnime = await Anime.findById(anime._id);
        expect(createdAnime).toBeDefined();
        expect(createdAnime?.name).toBe('anime-test');
    });

    test('should create many animes', async () => {
        const animeNames = ['Anime 1', 'Anime 2', 'Anime 3'];
        await Anime.create(
            animeNames.map((e) => ({
                name: e,
            })),
        );

        const createdAnimes = await Anime.find();
        expect(createdAnimes).toHaveLength(animeNames.length);
    });

    test('should convert name of anime to skip-connection-type', async () => {
        const animeNames = ['Anime 1', 'Anime 2', 'Anime 3'];
        const animeNamesNorm = ['anime-1', 'anime-2', 'anime-3'];
        await Anime.create(
            animeNames.map((e) => ({
                name: e,
            })),
        );

        const createdAnimes = await Anime.find().sort({ name: 1 });
        expect(createdAnimes).toHaveLength(animeNames.length);
        createdAnimes.forEach((e, idx) => {
            expect(e.name).toBe(animeNamesNorm[idx]);
        });
    });
});
