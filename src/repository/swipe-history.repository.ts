import { connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import { CheckUserAlreadySwipedParameterType, CountUserSwipedDays, CountUserSwipedDaysResponse, CreateNewSwipeHistoryParamterType, CreateNewUserMatchParamterType, SwipeHistoryType } from 'types/swipe-history.repository';

const createNewSwipeHistory = (params : CreateNewSwipeHistoryParamterType, trx : Transaction) => {
    try {
        return connection.query(
            `INSERT INTO "swipe_history" ("user_id", "direction", "swipe_user_id", "created_at")
             VALUES (${params.userId}, ${params.direction}, ${params.swipeUserId}, now());`, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const createNewMatchHistory = (params : CreateNewUserMatchParamterType, trx : Transaction) => {
    try {
        return connection.query(
            `INSERT INTO "user_match" ("user_id", "match_user_id", "created_at")
             VALUES (${params.userId}, ${params.matchUserId}, now());`, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}


const checkUserAlreadySwiped = (params: CheckUserAlreadySwipedParameterType) : Promise<SwipeHistoryType[]> => {
    try {
        return connection.query(
            `
                SELECT id FROM "swipe_history" WHERE "user_id" = ${params.userId} AND "swipe_user_id" = ${params.swipeUserId};
            `, {
                type: QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const countUserSwipeDays = (params: CountUserSwipedDays) : Promise<CountUserSwipedDaysResponse[]> => {
    try {
        return connection.query(
            `
                SELECT count(*) as "swiped_user" FROM "swipe_history" WHERE "user_id" = ${params.userId} AND "created_at" >= '${params.dateNow} 00:00:00' AND "created_at" <= '${params.dateNow} 23:59:59';
            `, {
                type: QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}


export {
    countUserSwipeDays,
    createNewMatchHistory,
    checkUserAlreadySwiped,
    createNewSwipeHistory
}