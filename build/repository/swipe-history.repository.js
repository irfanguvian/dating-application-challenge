"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewSwipeHistory = exports.checkUserAlreadySwiped = exports.createNewMatchHistory = exports.countUserSwipeDays = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createNewSwipeHistory = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "swipe_history" ("user_id", "direction", "swipe_user_id", "created_at")
             VALUES (${params.userId}, ${params.direction}, ${params.swipeUserId}, now());`, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewSwipeHistory = createNewSwipeHistory;
const createNewMatchHistory = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "user_match" ("user_id", "match_user_id", "created_at")
             VALUES (${params.userId}, ${params.matchUserId}, now());`, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewMatchHistory = createNewMatchHistory;
const checkUserAlreadySwiped = (params) => {
    try {
        return index_1.connection.query(`
                SELECT id FROM "swipe_history" WHERE "user_id" = ${params.userId} AND "swipe_user_id" = ${params.swipeUserId};
            `, {
            type: sequelize_1.QueryTypes.SELECT
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.checkUserAlreadySwiped = checkUserAlreadySwiped;
const countUserSwipeDays = (params) => {
    try {
        return index_1.connection.query(`
                SELECT count(*) as "swiped_user" FROM "swipe_history" WHERE "user_id" = ${params.userId} AND "created_at" >= '${params.dateNow} 00:00:00' AND "created_at" <= '${params.dateNow} 23:59:59';
            `, {
            type: sequelize_1.QueryTypes.SELECT
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.countUserSwipeDays = countUserSwipeDays;
//# sourceMappingURL=swipe-history.repository.js.map