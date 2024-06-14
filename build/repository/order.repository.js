"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewOrder = exports.updateOrderStatus = exports.getOrderById = exports.updateOrderStatusToFailed = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createNewOrder = (params, trx) => {
    try {
        return index_1.connection.query(`
            INSERT INTO "order" ("order_number", "user_id" , "total_price", "description", "created_at", "updated_at", "status")
             VALUES ('${params.orderNumber}', '${params.userId}', ${params.totalPrice}, '${params.description}', now(), now(), 0);
             `, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewOrder = createNewOrder;
const updateOrderStatus = (params, trx) => {
    try {
        return index_1.connection.query(`
                UPDATE "order" SET status = ${params.status} WHERE id = ${params.orderId}
            `, {
            type: sequelize_1.QueryTypes.UPDATE,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const updateOrderStatusToFailed = (params, trx) => {
    try {
        return index_1.connection.query(`
                UPDATE "order" SET status = 2 WHERE user_id = ${params.userId} AND status = 0
            `, {
            type: sequelize_1.QueryTypes.UPDATE,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateOrderStatusToFailed = updateOrderStatusToFailed;
const getOrderById = (params) => {
    try {
        return index_1.connection.query(`
                SELECT * FROM "order" WHERE user_id = ${params.userId} AND id = ${params.orderId} AND status = 0
            `, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getOrderById = getOrderById;
//# sourceMappingURL=order.repository.js.map