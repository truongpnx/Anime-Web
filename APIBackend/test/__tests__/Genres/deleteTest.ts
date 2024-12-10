import { describe, expect, test } from '@jest/globals';

import Anime from '../../../src/models/Anime';
import Genre from '../../../src/models/Genre';

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

    test('Should delete a genre and update anime', async () => {
        const genres = await Genre.create([
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Comedy' },
            { name: 'Drama' },
        ]);

        const genresId = genres.map((e) => e._id);
        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime test',
            genres: genresId,
        });

        expect(anime).toBeDefined();
        expect(anime.genres).toHaveLength(4);

        const res = await Genre.deleteOne({ name: 'Adventure' });

        const genreNum = await Genre.countDocuments();
        expect(genreNum).toBe(3);

        expect(res?.deletedCount).toBe(1);
        const updated = await Anime.findById(anime._id);
        expect(updated?.genres).toHaveLength(3);
    });

    test('Should update anime when findAndDelete', async () => {
        const genres = await Genre.create([
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Comedy' },
            { name: 'Drama' },
        ]);

        const genresId = genres.map((e) => e._id);
        const anime = await Anime.create({
            name: 'anime-test',
            displayName: 'Anime test',
            genres: genresId,
        });

        expect(anime).toBeDefined();
        expect(anime.genres).toHaveLength(4);

        let res = await Genre.findOneAndDelete({ name: 'Action' });

        let genreNum = await Genre.countDocuments();
        expect(genreNum).toBe(3);

        expect(res).toBeDefined();
        expect(res?.name).toBe('Action');

        const updated = await Anime.findById(anime._id);
        expect(updated?.genres).toHaveLength(3);
    });

    test('Should delete many genres in anime', async () => {
        const genres = await Genre.create([
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Comedy' },
            { name: 'Drama' },
        ]);

        const genresId = genres.map((e) => e._id);
        const anime = await Anime.create({
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

        const updated = await Anime.findById(anime._id);
        expect(updated?.genres).toHaveLength(1);
    });
});
