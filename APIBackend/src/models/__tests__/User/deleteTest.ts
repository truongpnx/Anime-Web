import Comment from '../../Comment';
import User from '../../User';
import ViewHistory from '../../ViewHistory';

jest.mock('../../Comment');
jest.mock('../../ViewHistory');

describe('User Model delete test', () => {
    test('should delete related comments and view histories when deleteOne is called on a document', async () => {
        const mockUser = new User({
            email: 'example@mail.com',
            userName: 'user',
            password: 'password',
        });
        await mockUser.save();

        // Simulate deleteOne on the document
        await mockUser.deleteOne();

        // Verify that related data was deleted
        expect(Comment.deleteMany).toHaveBeenCalledWith({ userId: mockUser._id });
        expect(ViewHistory.deleteMany).toHaveBeenCalledWith({ userId: mockUser._id });
    });

    test('should delete related comments and view histories when deleteOne or findOneAndDelete is called on a query', async () => {
        const mockUser = new User({
            email: 'example@mail.com',
            userName: 'user',
            password: 'password',
        });
        await mockUser.save();

        // Simulate findOneAndDelete
        await User.findOneAndDelete({ _id: mockUser._id });

        // Verify that related data was deleted
        expect(Comment.deleteMany).toHaveBeenCalledWith({ userId: mockUser._id });
        expect(ViewHistory.deleteMany).toHaveBeenCalledWith({ userId: mockUser._id });
    });

    test('should delete related comments and view histories when deleteMany is called', async () => {
        // Mock some users
        const mockUsers = [
            new User({
                email: 'example1@mail.com',
                userName: 'user1',
                password: 'password',
            }),
            new User({
                email: 'example2@mail.com',
                userName: 'user2',
                password: 'password',
            }),
        ];

        // Save mock users
        await User.insertMany(mockUsers);

        // Mock the find query to return the _ids of the users
        jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);

        // Simulate deleteMany on the User model
        await User.deleteMany({ _id: { $in: mockUsers.map((u) => u._id) } });

        // Verify that related data was deleted for each user
        expect(Comment.deleteMany).toHaveBeenCalledWith({
            userId: { $in: mockUsers.map((u) => u._id) },
        });

        expect(ViewHistory.deleteMany).toHaveBeenCalledWith({
            userId: { $in: mockUsers.map((u) => u._id) },
        });
    });
});
