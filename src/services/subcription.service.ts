import { connection } from "../index";
import moment from 'moment';
import {  createNewSubcription, getSubcriptionById, updateSubcription } from "../repository/subscription.repository";
import { UserDetailType } from "types/user-detail.repository";
import {v4 as uuidv4} from 'uuid';
import { createNewOrder, getOrderById, updateOrderStatus, updateOrderStatusToFailed } from "../repository/order.repository";
import { UpdateSubcriptionStatusParameterType } from "types/subcription.service";
import { isNil } from "lodash";

const createNewSubcriptionHandler = async (context : UserDetailType) => {
    return connection.transaction(async (trx) => {
        try {
            // check subcription
            const checkUserSubcription = await getSubcriptionById({userId : context.user_id})

            if(checkUserSubcription.length > 0 && checkUserSubcription[0].status === 1) {
                throw new Error("User already have subcription")
            }
            // create new subcription

            if(checkUserSubcription.length == 0) {
                const createNewSubcriptionParameter = {
                    userId : context.user_id,
                    status : 0
                }
    
                const createSubcription = await createNewSubcription(createNewSubcriptionParameter, trx)
            }
            // create order

            const createNewOrderParameter = {
                userId : context.user_id,
                orderNumber : uuidv4(),
                totalPrice : 100,
                description : `Subcription user ${context.email} for 1 month`,
            }

            const createOrder = await createNewOrder(createNewOrderParameter, trx)
            
            return {
                success: true,
                message : "Subcription successfully created",
            }
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    })
};

const orderStatusMap = {
    'SUCCESS' : 1,
    'FAILED' : 2,
    'PENDING' : 0
}

const updateSubcriptionStatusHandler = async (body: UpdateSubcriptionStatusParameterType) => {
    return connection.transaction(async (trx) => {
        try {
            // check order exist
            const statusOrder = orderStatusMap[body.updateType]
            if(isNil(statusOrder)) {
                throw new Error("Invalid update type")
            }
    
            const checkOrderParameter = {
                orderId : body.orderId,
                userId : body.userId
            }
            const checkOrder = await getOrderById(checkOrderParameter)
    
            if(checkOrder.length === 0) {
                throw new Error("Order not found")
            }

            const checkUserSubcription = await getSubcriptionById({userId : body.userId})
            
            if(checkUserSubcription.length > 0 && checkUserSubcription[0].status == 1) {
                throw new Error("User already have subcription")
            }
            
            // update order status
            const updateOrderParameter = {
                orderId : body.orderId,
                status : statusOrder
            }
    
            const updateOrder = await updateOrderStatus(updateOrderParameter, trx)

            const updateAllOrderToFailedParameter = {
                userId: body.userId
            }

            const updateAllOrderToFailed = await updateOrderStatusToFailed(updateAllOrderToFailedParameter, trx)
            // update subcription status

            const updateSubcriptionParameter = {
                userId : body.userId,
                status : statusOrder,
                endDate : moment().add(1, 'M').format('YYYY-MM-DD HH:mm:ss')
            }

            const updateSubUser= await updateSubcription(updateSubcriptionParameter, trx)
    
            return {
                success: true,
                message : "Subcription Successfully updated",
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })
};

export {
    createNewSubcriptionHandler,
    updateSubcriptionStatusHandler
}