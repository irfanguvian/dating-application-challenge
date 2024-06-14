import {connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import {  CreateTokenUserArgumentType } from 'types/auth-token.repository';

const createTokenUser = (params: CreateTokenUserArgumentType, trx: Transaction) => {
    try {
        return connection.query(
            `INSERT INTO "auth_token" ("access_id", "user_id" , "created_at", "expired_at")
             VALUES ('${params.accessId}', '${params.userId}', now(), '${params.endDate}');`, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }

};

const checkAccessIdUser = (accessId: string) => {
    try {
        return connection.query(
            `SELECT * FROM "auth_token" WHERE "access_id" = '${accessId}' AND "expired_at" > now()`, {
                type: QueryTypes.SELECT,
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }

};

const deleteTokenUser = (userId: number, trx: Transaction) => {
    try {
        return connection.query(
            `DELETE FROM "auth_token" WHERE "user_id" = ${userId}`, {
                type: QueryTypes.DELETE,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }


};

export {
    deleteTokenUser,
    checkAccessIdUser,
    createTokenUser
}