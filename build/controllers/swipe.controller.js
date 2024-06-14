"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swipeUserController = void 0;
const swipe_service_1 = require("../services/swipe.service");
async function swipeUserController(req, res) {
    const result = {
        success: false,
        message: "Failed to swipe user",
    };
    try {
        req.body.userId = req.context.user_id;
        req.body.isPremium = req.context.is_premium;
        const swipedUser = await (0, swipe_service_1.swipeHandler)(req.body);
        result.message = swipedUser.message;
        result.success = swipedUser.success;
        return res.status(200).json(result);
    }
    catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}
exports.swipeUserController = swipeUserController;
//# sourceMappingURL=swipe.controller.js.map