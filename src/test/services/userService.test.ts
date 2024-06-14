import { getListUserNoSwipe } from '../../repository/user-detail.repository';
import { connection } from '../../index';
import { currentUser, getListUserSwipe } from '../../services/user.service';
import { UserDetailType } from 'types/user-detail.repository';

jest.mock('../../repository/user-detail.repository');


beforeAll(async () => {
    await connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
        throw new Error('Unable to connect to the database');
    })
});
describe('User Service', () => {
    describe('currentUser', () => {
        it('should return the current user successfully', async () => {
            const mockContext: UserDetailType = {
                user_id: 1,
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: "User",
                id: 1,
                is_premium: false,
                created_at: new Date(),
                updated_at: new Date()
            };

            const result = currentUser(mockContext);

            expect(result.success).toBe(true);
            expect(result.message).toBe('User fetched successfully');
            expect(result.data).toEqual(mockContext);
        });
    });

    describe('getListUserSwipe', () => {
        const mockContext: UserDetailType = {
            user_id: 1,
            email: 'testuser@example.com',
            first_name: 'Test',
            last_name: "User",
            id: 1,
            is_premium: false,
            created_at: new Date(),
            updated_at: new Date()
        };

        const responseMock = [
            {
                user_id: 2,
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: "User",
                id: 2,
                is_premium: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                user_id: 3,
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: "User",
                id: 3,
                is_premium: false,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]
        it('should return a list of user IDs the user has swiped right on', async () => {
            (getListUserNoSwipe as jest.Mock).mockResolvedValue(responseMock);
            const result = await getListUserSwipe(mockContext);
            expect(result.success).toBe(true);
            expect(result.data).toBe(responseMock);
        });

        it('should throw an error if the user ID is invalid', async () => {
            try {
                mockContext.user_id = 0;
                await getListUserSwipe(mockContext);
            } catch (error) {
                expect(error.message).toBe('Invalid user ID');
            }
        });
    });
    
});