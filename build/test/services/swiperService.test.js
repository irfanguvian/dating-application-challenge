"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swipe_service_1 = require("../../services/swipe.service");
const swipe_history_repository_1 = require("../../repository/swipe-history.repository");
const index_1 = require("../../index");
jest.mock('../../repository/swipe-history.repository');
jest.mock('../../index', () => ({
    connection: {
        transaction: jest.fn().mockImplementation((callback) => {
            return callback('mockTransaction');
        }),
    },
}));
describe('Swipe Service', () => {
    describe('swipeHandler', () => {
        const mockSwipeHandlerParameter = {
            userId: 1,
            userSwipeId: 2,
            direction: 'right',
            isPremium: false
        };
        it('should handle swipe successfully', async () => {
            swipe_history_repository_1.countUserSwipeDays.mockResolvedValue([{ swiped_user: 5 }]);
            swipe_history_repository_1.checkUserAlreadySwiped.mockResolvedValue([]);
            swipe_history_repository_1.createNewSwipeHistory.mockResolvedValue(true);
            swipe_history_repository_1.createNewMatchHistory.mockResolvedValue(true);
            const result = await (0, swipe_service_1.swipeHandler)(mockSwipeHandlerParameter);
            expect(index_1.connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Swipe successfully');
        });
        it('should handle errors when swiping', async () => {
            swipe_history_repository_1.countUserSwipeDays.mockResolvedValue([{ swiped_user: 5 }]);
            swipe_history_repository_1.checkUserAlreadySwiped.mockResolvedValue([]);
            swipe_history_repository_1.createNewSwipeHistory.mockRejectedValue(new Error('Database error'));
            try {
                await (0, swipe_service_1.swipeHandler)(mockSwipeHandlerParameter);
            }
            catch (error) {
                expect(error.message).toBe('Database error');
            }
        });
        it('should not swipe if user has already swiped', async () => {
            swipe_history_repository_1.countUserSwipeDays.mockResolvedValue([{ swiped_user: 5 }]);
            swipe_history_repository_1.checkUserAlreadySwiped.mockResolvedValue([{}]); // Mock existing swipe
            try {
                await (0, swipe_service_1.swipeHandler)(mockSwipeHandlerParameter);
            }
            catch (error) {
                expect(error.message).toBe('User already swiped');
            }
        });
        it('should not swipe if user has reached the limit of swiping user', async () => {
            swipe_history_repository_1.countUserSwipeDays.mockResolvedValue([{ swiped_user: 10 }]); // Mock limit reached
            try {
                await (0, swipe_service_1.swipeHandler)(mockSwipeHandlerParameter);
            }
            catch (error) {
                expect(error.message).toBe('You have reached the limit of swiping user');
            }
        });
        it('should not swipe if invalid swipe direction is provided', async () => {
            const invalidSwipeHandlerParameter = {
                ...mockSwipeHandlerParameter,
                direction: 'invalid'
            };
            try {
                await (0, swipe_service_1.swipeHandler)(invalidSwipeHandlerParameter);
            }
            catch (error) {
                expect(error.message).toBe('Invalid swipe direction');
            }
        });
    });
});
//# sourceMappingURL=swiperService.test.js.map