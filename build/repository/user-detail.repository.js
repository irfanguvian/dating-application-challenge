"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetail = exports.createNewUserDetail = exports.getListUserNoSwipe = void 0;
const index_1 = require("../index");
const sequelize_1 = require("sequelize");
const createNewUserDetail = (params, trx) => {
    try {
        return index_1.connection.query(`INSERT INTO "user_detail" ("user_id", "first_name", "last_name", "email", "created_at", "updated_at")
             VALUES ('${params.userId}', '${params.firstName}', '${params.lastName}', '${params.email}', now(), now());`, {
            type: sequelize_1.QueryTypes.INSERT,
            transaction: trx
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createNewUserDetail = createNewUserDetail;
const getListUserNoSwipe = (userId) => {
    try {
        return index_1.connection.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getListUserNoSwipe = getListUserNoSwipe;
const getUserDetail = (userId) => {
    try {
        return index_1.connection.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getUserDetail = getUserDetail;
//# sourceMappingURL=user-detail.repository.js.map