"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get('/user-swipe-list', user_controller_1.getListUserSwipeController);
userRouter.get('/current-user', user_controller_1.currentUserController);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map