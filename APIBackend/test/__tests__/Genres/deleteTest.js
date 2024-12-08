const Anime = require('../../../src/models/Anime');
const Genre = require('../../../src/models/Genre');

describe('Genre Model delete', () => {
    test('Should delete a genre by ID', async () => {
        const genre = await Genre.create({ name: 'Horror' });

        // Verify the genre exists before deletion
        const existingGenre = await Genre.findById(genre._id);
        expect(existingGenre).not.toBeNull();

        // Delete the genre
        await Genre.deleteOne({ _id: genre._id });

        // Verify the genre no longer exists in the database
        const deletedGenre = await Genre.findById(genre._id);
        expect(deletedGenre).toBeNull();
    });

    test('Should handle deleting a non-existent genre gracefully', async () => {
        const nonExistentName = 'Chill Guy';

        // Attempt to delete a non-existent genre
        const res = await Genre.deleteOne({ name: nonExistentName });

        // Ensure the delete operation reports no rows affected
        expect(res.deletedCount).toBe(0);
    });

    test('Should delete multiple genres matching criteria', async () => {
        // Insert multiple genres
        await Genre.create([{ name: 'Action' }, { name: 'Adventure' }, { name: 'Comedy' }, { name: 'Drama' }]);

        // Verify the genres exist before deletion
        const allGenresBefore = await Genre.find();
        expect(allGenresBefore).toHaveLength(4);

        // Delete genres matching criteria
        const res = await Genre.deleteMany({ name: { $in: ['Action', 'Comedy'] } });

        // Verify the correct number of records were deleted
        expect(res.deletedCount).toBe(2);

        // Verify the database state after deletion
        const remainingGenres = await Genre.find();
        expect(remainingGenres).toHaveLength(2);

        // Ensure only the intended records remain
        const remainingNames = remainingGenres.map((genre) => genre.name);
        expect(remainingNames).toEqual(expect.arrayContaining(['Adventure', 'Drama']));
    });

    test('Should handle bulk deletion with no matches gracefully', async () => {
        await Genre.create([{ name: 'Action' }, { name: 'Adventure' }, { name: 'Comedy' }, { name: 'Drama' }]);

        // Attempt to delete genres with a non-existent condition
        const res = await Genre.deleteOne({ name: 'NonExistentGenre' });

        // Ensure no records were deleted
        expect(res.deletedCount).toBe(0);

        // Verify the database remains unchanged
        const allGenres = await Genre.find();
        expect(allGenres).toHaveLength(4);
    });

    test('Should delete a genre in anime', async () => {
        const genres = await Genre.create([
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Comedy' },
            { name: 'Drama' },
        ]);

        const genresId = genres.map((e) => e._id);
        let anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime test',
            genres: genresId,
        });

        expect(anime).toBeDefined();
        expect(anime.genres).toHaveLength(4);

        let res = await Genre.findOneAndDelete({ name: 'Action' });

        expect(res).toBeDefined();
        expect(res.name).toBe('Action');
        anime = await Anime.findById(anime._id);
        expect(anime.genres).toHaveLength(3);

        res = await Genre.deleteOne({ name: 'Adventure' });

        expect(res.deletedCount).toBe(1);
        anime = await Anime.findById(anime._id);
        expect(anime.genres).toHaveLength(2);
    });

    test('Should delete many genres in anime', async () => {
        const genres = await Genre.create([
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Comedy' },
            { name: 'Drama' },
        ]);

        const genresId = genres.map((e) => e._id);
        let anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime test',
            genres: genresId,
        });

        expect(anime).toBeDefined();
        expect(anime.genres).toHaveLength(4);

        const res = await Genre.deleteMany({
            name: { $ne: 'Action' },
        });
        expect(res.deletedCount).toBe(3);

        anime = await Anime.findById(anime._id);
        expect(anime.genres).toHaveLength(1);
    });
});
