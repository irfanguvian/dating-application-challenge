"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_detail_repository_1 = require("../../repository/user-detail.repository");
const index_1 = require("../../index");
const user_service_1 = require("../../services/user.service");
jest.mock('../../repository/user-detail.repository');
beforeAll(async () => {
    await index_1.connection.authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
        throw new Error('Unable to connect to the database');
    });
});
describe('User Service', () => {
    describe('currentUser', () => {
        it('should return the current user successfully', async () => {
            const mockContext = {
                user_id: 1,
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: "User",
                id: 1,
                is_premium: false,
                created_at: new Date(),
                updated_at: new Date()
            };
            const result = (0, user_service_1.currentUser)(mockContext);
            expect(result.success).toBe(true);
            expect(result.message).toBe('User fetched successfully');
            expect(result.data).toEqual(mockContext);
        });
    });
    describe('getListUserSwipe', () => {
        const mockContext = {
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
        ];
        it('should return a list of user IDs the user has swiped right on', async () => {
            user_detail_repository_1.getListUserNoSwipe.mockResolvedValue(responseMock);
            const result = await (0, user_service_1.getListUserSwipe)(mockContext);
            expect(result.success).toBe(true);
            expect(result.data).toBe(responseMock);
        });
        it('should throw an error if the user ID is invalid', async () => {
            try {
                mockContext.user_id = 0;
                await (0, user_service_1.getListUserSwipe)(mockContext);
            }
            catch (error) {
                expect(error.message).toBe('Invalid user ID');
            }
        });
    });
});
//# sourceMappingURL=userService.test.js.map