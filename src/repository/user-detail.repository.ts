import { connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import {  CreateNewUserDetailArgumentType, UserDetailType } from 'types/user-detail.repository';

const createNewUserDetail = (params : CreateNewUserDetailArgumentType, trx : Transaction) => {
    try {
        return connection.query(
            `INSERT INTO "user_detail" ("user_id", "first_name", "last_name", "email", "created_at", "updated_at")
             VALUES ('${params.userId}', '${params.firstName}', '${params.lastName}', '${params.email}', now(), now());`, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const getListUserNoSwipe = (userId : number) : Promise<UserDetailType[]> => {
    try {
        return connection.query(
            `
            SELECT 
                ud.*,
                CASE 
                    WHEN s.status = 1 THEN TRUE
                    ELSE FALSE
                END AS is_premium
            FROM 
                user_detail ud
            LEFT JOIN 
                swipe_history sh ON ud.user_id = sh.swipe_user_id AND sh.user_id = ${userId}
            LEFT JOIN 
                subcription s ON ud.user_id = s.user_id
            WHERE 
                sh.user_id IS NULL AND ud.user_id != ${userId};
            `, {
                type: QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserDetail = (userId : number) : Promise<UserDetailType[]> => {
    try {
        return connection.query(
            `
            SELECT 
                ud.*,
                CASE 
                    WHEN s.status = 1 THEN TRUE
                    ELSE FALSE
                END AS is_premium
            FROM 
                user_detail ud
            LEFT JOIN 
                subcription s ON ud.user_id = s.user_id
            WHERE 
                ud.user_id = ${userId};
            `, {
                type: QueryTypes.SELECT
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    getListUserNoSwipe,
    createNewUserDetail,
    getUserDetail
}