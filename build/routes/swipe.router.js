"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swipe_controller_1 = require("../controllers/swipe.controller");
const express_1 = __importDefault(require("express"));
const swipeRouter = express_1.default.Router();
swipeRouter.post('/user-swipe', swipe_controller_1.swipeUserController);
exports.default = swipeRouter;
//# sourceMappingURL=swipe.router.js.map