import { createNewSubcriptionHandler, updateSubcriptionStatusHandler } from '../../services/subcription.service';
import { createNewSubcription, getSubcriptionById, updateSubcription } from '../../repository/subscription.repository';
import { createNewOrder, getOrderById, updateOrderStatus, updateOrderStatusToFailed } from '../../repository/order.repository';
import { connection } from '../../index';

jest.mock('../../repository/subscription.repository');
jest.mock('../../repository/order.repository');
jest.mock('../../index', () => ({
    connection: {
        transaction: jest.fn().mockImplementation((callback) => {
            return callback('mockTransaction');
        }),
    },
}));

describe('Subscription Service', () => {
    describe('createNewSubcriptionHandler', () => {
        const mockUserDetail = {
            user_id: 1,
            email: 'testuser@example.com',
            first_name: 'Test',
            last_name: "User",
            id: 1,
            is_premium: false,
            created_at: new Date(),
            updated_at: new Date()
        };
        it('should create a new subscription successfully', async () => {
            (getSubcriptionById as jest.Mock).mockResolvedValue([]);
            (createNewSubcription as jest.Mock).mockResolvedValue(true);
            (createNewOrder as jest.Mock).mockResolvedValue(true);
            const result = await createNewSubcriptionHandler(mockUserDetail);
            expect(connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Subcription successfully created');
        });

        it('should handle errors when creating a new subscription', async () => {
            (getSubcriptionById as jest.Mock).mockResolvedValue([]);
            (createNewSubcription as jest.Mock).mockRejectedValue(new Error('Database error'));
            try {
                await createNewSubcriptionHandler(mockUserDetail);
            } catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });

        it('should not create a new subscription if one already exists', async () => {
            (getSubcriptionById as jest.Mock).mockResolvedValue([{}]); // Mock existing subscription
            (createNewSubcription as jest.Mock).mockResolvedValue(true);
            (createNewOrder as jest.Mock).mockResolvedValue(true);
            try {
                await createNewSubcriptionHandler(mockUserDetail);
            } catch (error) {
                expect(error).toEqual(new Error('Subscription already exists'));
            }
        });

        it('should not create a new subscription if one already exists', async () => {
            (getSubcriptionById as jest.Mock).mockResolvedValue([{}]); // Mock existing subscription
            (createNewSubcription as jest.Mock).mockResolvedValue(true);
            (createNewOrder as jest.Mock).mockResolvedValue(true);
            try {
                await createNewSubcriptionHandler(mockUserDetail);
            } catch (error) {
                expect(error).toEqual(new Error('Subscription already exists'));
            }
        });
        // Add more test cases as per your requirements
    });

    describe('updateSubcriptionStatusHandler', () => {
        const mockUpdateSubcriptionStatusParameter = {
            orderId: 1,
            userId: 1,
            updateType: 'SUCCESS'
        };
        it('should update the subscription status successfully', async () => {
            (getOrderById as jest.Mock).mockResolvedValue([{}]);
            (getSubcriptionById as jest.Mock).mockResolvedValue([{ status: 0 }]);
            (updateOrderStatus as jest.Mock).mockResolvedValue(true);
            (updateOrderStatusToFailed as jest.Mock).mockResolvedValue(true);
            (updateSubcription as jest.Mock).mockResolvedValue(true);
            const result = await updateSubcriptionStatusHandler(mockUpdateSubcriptionStatusParameter);
            expect(connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Subcription Successfully updated');
        });

        it('should handle errors when updating the subscription status', async () => {
            (updateOrderStatus as jest.Mock).mockRejectedValue(new Error('Database error'));
            try {
                await updateSubcriptionStatusHandler(mockUpdateSubcriptionStatusParameter);
            } catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
    
        it('should not update the subscription status if the subscription does not exist', async () => {
            (getSubcriptionById as jest.Mock).mockResolvedValue([]);
            try {
                await updateSubcriptionStatusHandler(mockUpdateSubcriptionStatusParameter);
            } catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
    
    
        it('should handle errors when fetching the subscription by id', async () => {
            (getSubcriptionById as jest.Mock).mockRejectedValue(new Error('Database error'));
            try {
                await updateSubcriptionStatusHandler(mockUpdateSubcriptionStatusParameter);
            } catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
    });
});