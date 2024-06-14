"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signupController = void 0;
const auth_service_1 = require("../services/auth.service");
async function signupController(req, res) {
    const result = {
        success: false,
        message: "Failed to signup user"
    };
    try {
        const signupRes = await (0, auth_service_1.signupUserHandler)(req.body);
        result.message = signupRes.message;
        result.success = signupRes.success;
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(result);
    }
}
exports.signupController = signupController;
async function loginController(req, res) {
    const result = {
        success: false,
        message: "Failed to login user",
        data: {
            token: ""
        }
    };
    try {
        const result = await (0, auth_service_1.loginUserHandler)(req.body);
        result.data.token = result.data.token;
        result.success = result.success;
        result.message = result.message;
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(result);
    }
}
exports.loginController = loginController;
//# sourceMappingURL=auth.controller.js.map