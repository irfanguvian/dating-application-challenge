"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subcription_service_1 = require("../../services/subcription.service");
const subscription_repository_1 = require("../../repository/subscription.repository");
const order_repository_1 = require("../../repository/order.repository");
const index_1 = require("../../index");
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
            subscription_repository_1.getSubcriptionById.mockResolvedValue([]);
            subscription_repository_1.createNewSubcription.mockResolvedValue(true);
            order_repository_1.createNewOrder.mockResolvedValue(true);
            const result = await (0, subcription_service_1.createNewSubcriptionHandler)(mockUserDetail);
            expect(index_1.connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Subcription successfully created');
        });
        it('should handle errors when creating a new subscription', async () => {
            subscription_repository_1.getSubcriptionById.mockResolvedValue([]);
            subscription_repository_1.createNewSubcription.mockRejectedValue(new Error('Database error'));
            try {
                await (0, subcription_service_1.createNewSubcriptionHandler)(mockUserDetail);
            }
            catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
        it('should not create a new subscription if one already exists', async () => {
            subscription_repository_1.getSubcriptionById.mockResolvedValue([{}]); // Mock existing subscription
            subscription_repository_1.createNewSubcription.mockResolvedValue(true);
            order_repository_1.createNewOrder.mockResolvedValue(true);
            try {
                await (0, subcription_service_1.createNewSubcriptionHandler)(mockUserDetail);
            }
            catch (error) {
                expect(error).toEqual(new Error('Subscription already exists'));
            }
        });
        it('should not create a new subscription if one already exists', async () => {
            subscription_repository_1.getSubcriptionById.mockResolvedValue([{}]); // Mock existing subscription
            subscription_repository_1.createNewSubcription.mockResolvedValue(true);
            order_repository_1.createNewOrder.mockResolvedValue(true);
            try {
                await (0, subcription_service_1.createNewSubcriptionHandler)(mockUserDetail);
            }
            catch (error) {
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
            order_repository_1.getOrderById.mockResolvedValue([{}]);
            subscription_repository_1.getSubcriptionById.mockResolvedValue([{ status: 0 }]);
            order_repository_1.updateOrderStatus.mockResolvedValue(true);
            order_repository_1.updateOrderStatusToFailed.mockResolvedValue(true);
            subscription_repository_1.updateSubcription.mockResolvedValue(true);
            const result = await (0, subcription_service_1.updateSubcriptionStatusHandler)(mockUpdateSubcriptionStatusParameter);
            expect(index_1.connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Subcription Successfully updated');
        });
        it('should handle errors when updating the subscription status', async () => {
            order_repository_1.updateOrderStatus.mockRejectedValue(new Error('Database error'));
            try {
                await (0, subcription_service_1.updateSubcriptionStatusHandler)(mockUpdateSubcriptionStatusParameter);
            }
            catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
        it('should not update the subscription status if the subscription does not exist', async () => {
            subscription_repository_1.getSubcriptionById.mockResolvedValue([]);
            try {
                await (0, subcription_service_1.updateSubcriptionStatusHandler)(mockUpdateSubcriptionStatusParameter);
            }
            catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
        it('should handle errors when fetching the subscription by id', async () => {
            subscription_repository_1.getSubcriptionById.mockRejectedValue(new Error('Database error'));
            try {
                await (0, subcription_service_1.updateSubcriptionStatusHandler)(mockUpdateSubcriptionStatusParameter);
            }
            catch (error) {
                expect(error).toEqual(new Error('Database error'));
            }
        });
    });
});
//# sourceMappingURL=subcriptionService.test.js.map