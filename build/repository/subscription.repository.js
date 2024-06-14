"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubcription = exports.createNewSubcription = exports.getSubcriptionById = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createNewSubcription = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "subcription" ("user_id", "end_date" , "status", "created_at")
             VALUES (${params.userId}, null, ${params.status}, now());`, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewSubcription = createNewSubcription;
const updateSubcription = (params, trx) => {
    try {
        return index_1.connection.query(`
                UPDATE "subcription" SET status = ${params.status}, end_date = '${params.endDate}' WHERE user_id = ${params.userId}
            `, {
            type: sequelize_1.QueryTypes.UPDATE,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateSubcription = updateSubcription;
const getSubcriptionById = (params) => {
    try {
        return index_1.connection.query(`
                SELECT * FROM "subcription" WHERE user_id = ${params.userId}
            `, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getSubcriptionById = getSubcriptionById;
//# sourceMappingURL=subscription.repository.js.map