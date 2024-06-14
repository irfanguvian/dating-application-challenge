import {connection } from '../index'
import { QueryTypes, Transaction } from 'sequelize';
import { CheckSubcriptionParameterType, CreateNewSubcriptionParameterType, SubcriptionType, UpdateSubcriptionParameterType } from 'types/subcription.repository';

const createNewSubcription = (params: CreateNewSubcriptionParameterType, trx: Transaction) => {
    try {
        return connection.query(
            `INSERT INTO "subcription" ("user_id", "end_date" , "status", "created_at")
             VALUES (${params.userId}, null, ${params.status}, now());`, {
                type: QueryTypes.INSERT,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateSubcription = (params: UpdateSubcriptionParameterType, trx: Transaction) => {
    try {
        return connection.query(
            `
                UPDATE "subcription" SET status = ${params.status}, end_date = '${params.endDate}' WHERE user_id = ${params.userId}
            `, {
                type: QueryTypes.UPDATE,
                transaction: trx
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }
};

const getSubcriptionById = (params: CheckSubcriptionParameterType) : Promise<SubcriptionType[]> => {
    try {
        return connection.query(
            `
                SELECT * FROM "subcription" WHERE user_id = ${params.userId}
            `, {
                type: QueryTypes.SELECT,
            }
        );
    } catch (error) {
        throw new Error(error.message)
    }

}

export {
    getSubcriptionById,
    createNewSubcription,
    updateSubcription
}