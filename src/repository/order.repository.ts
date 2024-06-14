import { connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import { CreateNewOrderParameterType, GetOrderByIdParameterType, UpdateOrderParameterType, UpdateOrderToFailedParameterType } from 'types/order.repository';

const createNewOrder = (params: CreateNewOrderParameterType, trx: Transaction) => {
    try {
        return connection.query(
            `
            INSERT INTO "order" ("order_number", "user_id" , "total_price", "description", "created_at", "updated_at", "status")
             VALUES ('${params.orderNumber}', '${params.userId}', ${params.totalPrice}, '${params.description}', now(), now(), 0);
             `, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateOrderStatus = (params: UpdateOrderParameterType, trx: Transaction) => {
    try {
        return connection.query(
            `
                UPDATE "order" SET status = ${params.status} WHERE id = ${params.orderId}
            `, {
                type: QueryTypes.UPDATE,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateOrderStatusToFailed = (params: UpdateOrderToFailedParameterType, trx: Transaction) => {
    try {
        return connection.query(
            `
                UPDATE "order" SET status = 2 WHERE user_id = ${params.userId} AND status = 0
            `, {
                type: QueryTypes.UPDATE,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};


const getOrderById = (params: GetOrderByIdParameterType) => {
    try {
        return connection.query(
            `
                SELECT * FROM "order" WHERE user_id = ${params.userId} AND id = ${params.orderId} AND status = 0
            `, {
                type: QueryTypes.SELECT,
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};

export {
    updateOrderStatusToFailed,
    getOrderById,
    updateOrderStatus,
    createNewOrder
}