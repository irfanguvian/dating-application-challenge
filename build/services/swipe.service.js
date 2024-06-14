"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swipeHandler = void 0;
const index_1 = require("../index");
const lodash_1 = require("lodash");
const swipe_history_repository_1 = require("../repository/swipe-history.repository");
const moment_1 = __importDefault(require("moment"));
const swipeDirectionMap = {
    left: 0,
    right: 1
};
const swipeHandler = async (body) => {
    return index_1.connection.transaction(async (trx) => {
        try {
            if ((0, lodash_1.isNil)(body.userSwipeId)) {
                throw new Error("userSwipeId is required");
            }
            if (['left', 'right'].indexOf(body.direction) == -1) {
                throw new Error("Invalid swipe direction");
            }
            const parameterGetUserById = {
                userId: body.userId,
                swipeUserId: body.userSwipeId
            };
            if (body.isPremium == false) {
                const now = (0, moment_1.default)().format('YYYY-MM-DD');
                const countUserSwiped = await (0, swipe_history_repository_1.countUserSwipeDays)({ userId: body.userId, dateNow: now });
                if (countUserSwiped[0].swiped_user >= 10) {
                    throw new Error("You have reached the limit of swiping user");
                }
            }
            // check user already swiped before
            const checkUserSwiped = await (0, swipe_history_repository_1.checkUserAlreadySwiped)(parameterGetUserById);
            if (!(0, lodash_1.isNil)(checkUserSwiped) && checkUserSwiped.length > 0) {
                throw new Error("User already swiped");
            }
            const parameterCreateNewSwipe = {
                userId: body.userId,
                swipeUserId: body.userSwipeId,
                direction: swipeDirectionMap['right']
            };
            const paramterUserMatch = {
                userId: body.userId,
                matchUserId: body.userSwipeId,
            };
            const createNewSwipeResponse = await (0, swipe_history_repository_1.createNewSwipeHistory)(parameterCreateNewSwipe, trx);
            if (body.direction === 'right') {
                const createNewUserMatchResponse = await (0, swipe_history_repository_1.createNewMatchHistory)(paramterUserMatch, trx);
            }
            return {
                success: true,
                message: "Swipe successfully",
            };
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    });
};
exports.swipeHandler = swipeHandler;
//# sourceMappingURL=swipe.service.js.map