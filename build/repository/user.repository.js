"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserLogin = exports.getUserByUsername = exports.createNewUser = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createNewUser = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "user" ("username", "password", "created_at", "login_at")
             VALUES ('${params.username}', '${params.password}', now(), null)
             RETURNING *;`, {
            type: sequelize_1.QueryTypes.SELECT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewUser = createNewUser;
const getUserByUsername = (username) => {
    try {
        return index_1.connection.query(`SELECT * FROM "user" WHERE "username" = '${username}'`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getUserByUsername = getUserByUsername;
const updateUserLogin = (username, trx) => {
    try {
        return index_1.connection.query(`UPDATE "user" SET "login_at" = now() WHERE "username" = '${username}'`, {
            type: sequelize_1.QueryTypes.UPDATE,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateUserLogin = updateUserLogin;
//# sourceMappingURL=user.repository.js.map