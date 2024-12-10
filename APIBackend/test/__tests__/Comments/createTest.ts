import { describe, expect, test } from '@jest/globals';
import Anime from '../../../src/models/Anime';
import Comment from '../../../src/models/Comment';
import User from '../../../src/models/User';

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
});
