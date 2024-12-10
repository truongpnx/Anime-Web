import { describe, expect, test } from '@jest/globals';

import Genre from '../../../src/models/Genre';

describe('Genre Model insert', () => {
    test('Should create a genre', async () => {
        const genreName = 'testAction';

        const genre = await Genre.create({ name: genreName });

        expect(genre).toBeDefined();
        expect(genre.name).toBe(genreName);

        const savedGenre = await Genre.findOne({ name: genreName });
        expect(savedGenre).not.toBeNull();
        expect(savedGenre?.name).toBe(genreName);
    });

    test('Should create many genres', async () => {
        const genresToInsert = [{ name: 'Action' }, { name: 'Adventure' }, { name: 'Comedy' }, { name: 'Drama' }];

        const genres = await Genre.create(genresToInsert);

        genres.forEach((genre, index) => {
            expect(genre.name).toBe(genresToInsert[index].name);
        });

        const allGenres = await Genre.find();
        expect(allGenres).toHaveLength(genresToInsert.length);

        const savedGenresNames = allGenres.map((g) => g.name);
        const insertedGenresNames = genresToInsert.map((g) => g.name);
        expect(savedGenresNames).toEqual(expect.arrayContaining(insertedGenresNames));
    });

    test('Should not allow inserting a genre that already exists', async () => {
        const genreName = 'Action';

        try {
            await Genre.create({ name: genreName });

            await Genre.create({ name: genreName });

            throw new Error('Duplicate genre insertion did not throw an error');
        } catch (error) {
            expect(error).toBeDefined();
            // expect(error.name).toBe('MongoServerError');
        }

        // Verify that only one record exists in the database
        const allGenres = await Genre.find({ name: genreName });
        expect(allGenres).toHaveLength(1);
    });
});
