"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const lodash_1 = require("lodash");
const auth_token_repository_1 = require("../repository/auth-token.repository");
const user_detail_repository_1 = require("../repository/user-detail.repository");
const auth_service_1 = require("../services/auth.service");
const verifyTokenMiddleware = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    // scan bearer token
    if ((0, lodash_1.isNil)(authHeader) || authHeader === '') {
        return res.status(400).json({ success: false, message: "Token is required" });
    }
    authHeader = authHeader.replace('Bearer ', '');
    if (authHeader) {
        try {
            const verifyTokenResponse = (0, auth_service_1.verifyUserTokenHandler)(authHeader);
            if (verifyTokenResponse.success == true) {
                const checkAccessId = await (0, auth_token_repository_1.checkAccessIdUser)(verifyTokenResponse.data.accessId);
                if (checkAccessId.length == 0) {
                    return res.status(400).json({ success: false, message: "Failed to verify token" });
                }
                const getUser = await (0, user_detail_repository_1.getUserDetail)(verifyTokenResponse.data.userId);
                req.context = getUser[0];
                return next();
            }
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "Failed to verify token" });
        }
    }
    return res.status(400).json({ success: false, message: "Failed to verify token" });
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
//# sourceMappingURL=auth.middleware.js.map