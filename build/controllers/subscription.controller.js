"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewSubcriptionController = exports.updatePaymentOrderController = void 0;
const subcription_service_1 = require("../services/subcription.service");
async function createNewSubcriptionController(req, res) {
    const result = {
        success: false,
        message: "Failed to create new subcription",
    };
    try {
        const context = req.context;
        const createSubs = await (0, subcription_service_1.createNewSubcriptionHandler)(context);
        result.message = createSubs.message;
        result.success = createSubs.success;
        return res.status(200).json(result);
    }
    catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}
exports.createNewSubcriptionController = createNewSubcriptionController;
async function updatePaymentOrderController(req, res) {
    const result = {
        success: false,
        message: "Failed to create new subcription",
    };
    try {
        req.body.userId = req.context.user_id;
        const createSubs = await (0, subcription_service_1.updateSubcriptionStatusHandler)(req.body);
        result.message = createSubs.message;
        result.success = createSubs.success;
        return res.status(200).json(result);
    }
    catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}
exports.updatePaymentOrderController = updatePaymentOrderController;
//# sourceMappingURL=subscription.controller.js.map