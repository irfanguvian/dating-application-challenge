"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubcriptionStatusHandler = exports.createNewSubcriptionHandler = void 0;
const index_1 = require("../index");
const moment_1 = __importDefault(require("moment"));
const subscription_repository_1 = require("../repository/subscription.repository");
const uuid_1 = require("uuid");
const order_repository_1 = require("../repository/order.repository");
const lodash_1 = require("lodash");
const createNewSubcriptionHandler = async (context) => {
    return index_1.connection.transaction(async (trx) => {
        try {
            // check subcription
            const checkUserSubcription = await (0, subscription_repository_1.getSubcriptionById)({ userId: context.user_id });
            if (checkUserSubcription.length > 0 && checkUserSubcription[0].status === 1) {
                throw new Error("User already have subcription");
            }
            // create new subcription
            if (checkUserSubcription.length == 0) {
                const createNewSubcriptionParameter = {
                    userId: context.user_id,
                    status: 0
                };
                const createSubcription = await (0, subscription_repository_1.createNewSubcription)(createNewSubcriptionParameter, trx);
            }
            // create order
            const createNewOrderParameter = {
                userId: context.user_id,
                orderNumber: (0, uuid_1.v4)(),
                totalPrice: 100,
                description: `Subcription user ${context.email} for 1 month`,
            };
            const createOrder = await (0, order_repository_1.createNewOrder)(createNewOrderParameter, trx);
            return {
                success: true,
                message: "Subcription successfully created",
            };
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    });
};
exports.createNewSubcriptionHandler = createNewSubcriptionHandler;
const orderStatusMap = {
    'SUCCESS': 1,
    'FAILED': 2,
    'PENDING': 0
};
const updateSubcriptionStatusHandler = async (body) => {
    return index_1.connection.transaction(async (trx) => {
        try {
            // check order exist
            const statusOrder = orderStatusMap[body.updateType];
            if ((0, lodash_1.isNil)(statusOrder)) {
                throw new Error("Invalid update type");
            }
            const checkOrderParameter = {
                orderId: body.orderId,
                userId: body.userId
            };
            const checkOrder = await (0, order_repository_1.getOrderById)(checkOrderParameter);
            if (checkOrder.length === 0) {
                throw new Error("Order not found");
            }
            const checkUserSubcription = await (0, subscription_repository_1.getSubcriptionById)({ userId: body.userId });
            if (checkUserSubcription.length > 0 && checkUserSubcription[0].status == 1) {
                throw new Error("User already have subcription");
            }
            // update order status
            const updateOrderParameter = {
                orderId: body.orderId,
                status: statusOrder
            };
            const updateOrder = await (0, order_repository_1.updateOrderStatus)(updateOrderParameter, trx);
            const updateAllOrderToFailedParameter = {
                userId: body.userId
            };
            const updateAllOrderToFailed = await (0, order_repository_1.updateOrderStatusToFailed)(updateAllOrderToFailedParameter, trx);
            // update subcription status
            const updateSubcriptionParameter = {
                userId: body.userId,
                status: statusOrder,
                endDate: (0, moment_1.default)().add(1, 'M').format('YYYY-MM-DD HH:mm:ss')
            };
            const updateSubUser = await (0, subscription_repository_1.updateSubcription)(updateSubcriptionParameter, trx);
            return {
                success: true,
                message: "Subcription Successfully updated",
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
};
exports.updateSubcriptionStatusHandler = updateSubcriptionStatusHandler;
//# sourceMappingURL=subcription.service.js.map