import {connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import { CreateNewUserArgumentType, UserType } from 'types/user.repository';

const createNewUser = (params : CreateNewUserArgumentType, trx : Transaction) : Promise<UserType[]> => {
    try {
        return connection.query(
            `INSERT INTO "user" ("username", "password", "created_at", "login_at")
             VALUES ('${params.username}', '${params.password}', now(), null)
             RETURNING *;`, {
                type: QueryTypes.SELECT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserByUsername = (username : string) : Promise<UserType[]> => {
    try {
        return connection.query(
            `SELECT * FROM "user" WHERE "username" = '${username}'`, {
                type: QueryTypes.SELECT,
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateUserLogin = (username : string, trx: Transaction) => {
    try {
        return connection.query(
            `UPDATE "user" SET "login_at" = now() WHERE "username" = '${username}'`, {
                type: QueryTypes.UPDATE,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    createNewUser,
    getUserByUsername,
    updateUserLogin
}