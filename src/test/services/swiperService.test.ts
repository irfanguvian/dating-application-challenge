import { swipeHandler } from '../../services/swipe.service';
import { checkUserAlreadySwiped, countUserSwipeDays, createNewMatchHistory, createNewSwipeHistory } from '../../repository/swipe-history.repository';
import { connection } from '../../index';
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
            (countUserSwipeDays as jest.Mock).mockResolvedValue([{ swiped_user: 5 }]);
            (checkUserAlreadySwiped as jest.Mock).mockResolvedValue([]);
            (createNewSwipeHistory as jest.Mock).mockResolvedValue(true);
            (createNewMatchHistory as jest.Mock).mockResolvedValue(true);
            const result = await swipeHandler(mockSwipeHandlerParameter);
            expect(connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Swipe successfully');
        });

        it('should handle errors when swiping', async () => {
            (countUserSwipeDays as jest.Mock).mockResolvedValue([{ swiped_user: 5 }]);
            (checkUserAlreadySwiped as jest.Mock).mockResolvedValue([]);
            (createNewSwipeHistory as jest.Mock).mockRejectedValue(new Error('Database error'));
            try {
                await swipeHandler(mockSwipeHandlerParameter);
            } catch (error) {
                expect(error.message).toBe('Database error');
            }
        });

        it('should not swipe if user has already swiped', async () => {
            (countUserSwipeDays as jest.Mock).mockResolvedValue([{ swiped_user: 5 }]);
            (checkUserAlreadySwiped as jest.Mock).mockResolvedValue([{}]); // Mock existing swipe
            try {
                await swipeHandler(mockSwipeHandlerParameter);
            } catch (error) {
                expect(error.message).toBe('User already swiped');
            }
        });

        it('should not swipe if user has reached the limit of swiping user', async () => {
            (countUserSwipeDays as jest.Mock).mockResolvedValue([{ swiped_user: 10 }]); // Mock limit reached
            try {
                await swipeHandler(mockSwipeHandlerParameter);
            } catch (error) {
                expect(error.message).toBe('You have reached the limit of swiping user');
            }
        });

        it('should not swipe if invalid swipe direction is provided', async () => {
            const invalidSwipeHandlerParameter = {
                ...mockSwipeHandlerParameter,
                direction: 'invalid'
            };
            try {
                await swipeHandler(invalidSwipeHandlerParameter);
            } catch (error) {
                expect(error.message).toBe('Invalid swipe direction');
            }
        });
    });
});