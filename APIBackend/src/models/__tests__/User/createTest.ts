import User from '../../User';
import bcrypt from 'bcrypt';

describe('User Model create test', () => {
    test('should create a user', async () => {
        const user = await User.create({
            email: 'example@mail.com',
            password: 'password',
            userName: 'user',
        });

        const savedUser = await User.findById(user._id);
        expect(savedUser).toBeDefined();
    });

    test('should enscrypt password', async () => {
        const rawPassword = 'password123';
        const user = await User.create({
            email: 'example@mail.com',
            password: rawPassword,
            userName: 'user',
        });

        expect(user.password).not.toBe(rawPassword);

        const isMatch = await bcrypt.compare(rawPassword, user.password);
        expect(isMatch).toBe(true);
    });
});
