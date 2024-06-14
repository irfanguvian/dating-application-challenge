"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListUserSwipe = exports.currentUser = void 0;
const user_detail_repository_1 = require("../repository/user-detail.repository");
const currentUser = (context) => {
    const result = {
        success: true,
        message: "User fetched successfully",
        data: context
    };
    return result;
};
exports.currentUser = currentUser;
const getListUserSwipe = async (context) => {
    try {
        const fetchUserListForSwipe = await (0, user_detail_repository_1.getListUserNoSwipe)(context.user_id);
        return {
            success: true,
            message: "User list successfully",
            data: fetchUserListForSwipe
        };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getListUserSwipe = getListUserSwipe;
//# sourceMappingURL=user.service.js.map