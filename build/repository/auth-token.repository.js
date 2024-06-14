"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = exports.checkAccessIdUser = exports.deleteTokenUser = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createTokenUser = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "auth_token" ("access_id", "user_id" , "created_at", "expired_at")
             VALUES ('${params.accessId}', '${params.userId}', now(), '${params.endDate}');`, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createTokenUser = createTokenUser;
const checkAccessIdUser = (accessId) => {
    try {
        return index_1.connection.query(`SELECT * FROM "auth_token" WHERE "access_id" = '${accessId}' AND "expired_at" > now()`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.checkAccessIdUser = checkAccessIdUser;
const deleteTokenUser = (userId, trx) => {
    try {
        return index_1.connection.query(`DELETE FROM "auth_token" WHERE "user_id" = ${userId}`, {
            type: sequelize_1.QueryTypes.DELETE,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.deleteTokenUser = deleteTokenUser;
//# sourceMappingURL=auth-token.repository.js.map