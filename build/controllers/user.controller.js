"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserController = exports.getListUserSwipeController = void 0;
const user_service_1 = require("../services/user.service");
async function getListUserSwipeController(req, res) {
    const result = {
        success: false,
        message: "Failed to fetch user",
        data: []
    };
    try {
        const fetchListUser = await (0, user_service_1.getListUserSwipe)(req.context);
        result.message = fetchListUser.message;
        result.success = fetchListUser.success;
        result.data = fetchListUser.data;
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(result);
    }
}
exports.getListUserSwipeController = getListUserSwipeController;
function currentUserController(req, res) {
    const result = {
        success: false,
        message: "Failed to login user",
        data: null
    };
    try {
        const user = (0, user_service_1.currentUser)(req.context);
        result.success = user.success;
        result.message = user.message;
        result.data = user.data;
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(result);
    }
}
exports.currentUserController = currentUserController;
//# sourceMappingURL=user.controller.js.map