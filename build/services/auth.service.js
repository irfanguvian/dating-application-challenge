"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserTokenHandler = exports.loginUserHandler = exports.signupUserHandler = void 0;
const lodash_1 = require("lodash");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const user_repository_1 = require("../repository/user.repository");
const user_detail_repository_1 = require("../repository/user-detail.repository");
const auth_token_repository_1 = require("../repository/auth-token.repository");
const moment_1 = __importDefault(require("moment"));
function checkEmail(email) {
    const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return pattern.test(email) ? true : false;
}
const signupUserHandler = async (body) => {
    return index_1.connection.transaction(async (trx) => {
        try {
            if ((0, lodash_1.isNil)(body.username) || (0, lodash_1.isEmpty)(body.username)) {
                throw new Error("Username is required");
            }
            if ((0, lodash_1.isNil)(body.password) || (0, lodash_1.isEmpty)(body.password)) {
                throw new Error("password is required");
            }
            if ((0, lodash_1.isNil)(body.retypePassword) || (0, lodash_1.isEmpty)(body.retypePassword)) {
                throw new Error("retypePassword is required");
            }
            if ((0, lodash_1.isNil)(body.firstName) || (0, lodash_1.isEmpty)(body.firstName)) {
                throw new Error("firstName is required");
            }
            if (body.password !== body.retypePassword) {
                throw new Error("password and retypePassword should be same");
            }
            if (!checkEmail(body.username)) {
                throw new Error("Invalid email address");
            }
            body.username = body.username.toLowerCase();
            const passwordEncrypted = await bcrypt.hash(body.password, 10);
            const parameterCreateNewUser = {
                username: body.username,
                password: passwordEncrypted
            };
            const createNewUserResponse = await (0, user_repository_1.createNewUser)(parameterCreateNewUser, trx);
            const parameterCreateNewUserDetail = {
                email: body.username,
                firstName: body.firstName,
                lastName: body.lastName,
                userId: createNewUserResponse[0].id,
            };
            const createNewUserDetailResponse = await (0, user_detail_repository_1.createNewUserDetail)(parameterCreateNewUserDetail, trx);
            return {
                success: true,
                message: "User created successfully",
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
};
exports.signupUserHandler = signupUserHandler;
const loginUserHandler = async (body) => {
    return index_1.connection.transaction(async (trx) => {
        try {
            if ((0, lodash_1.isNil)(body.username) || (0, lodash_1.isEmpty)(body.username)) {
                throw new Error("Username is required");
            }
            if ((0, lodash_1.isNil)(body.password) || (0, lodash_1.isEmpty)(body.password)) {
                throw new Error("password is required");
            }
            if (!checkEmail(body.username)) {
                throw new Error("Invalid email address");
            }
            // get user by username
            const getUser = await (0, user_repository_1.getUserByUsername)(body.username);
            if ((0, lodash_1.isNil)(getUser) || (0, lodash_1.isEmpty)(getUser)) {
                throw new Error("User not found");
            }
            const user = getUser[0];
            const checkPassword = await bcrypt.compare(body.password, user.password);
            if (!checkPassword) {
                throw new Error("wrong password, try again");
            }
            // update user login
            const updateUserLoginResponse = await (0, user_repository_1.updateUserLogin)(body.username, trx);
            // create token JWT
            const accessId = (0, uuid_1.v4)();
            const parameterCreateTokenUser = {
                accessId: accessId,
                userId: +user.id,
                endDate: (0, moment_1.default)().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            };
            const secretKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secretkey";
            const token = jsonwebtoken_1.default.sign(parameterCreateTokenUser, secretKey, {
                expiresIn: '1 days',
            });
            const deleteTokenUserResponse = await (0, auth_token_repository_1.deleteTokenUser)(+user.id, trx);
            const createTokenResponse = await (0, auth_token_repository_1.createTokenUser)(parameterCreateTokenUser, trx);
            return {
                success: true,
                message: "User login successfully",
                data: {
                    token: token
                }
            };
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    });
};
exports.loginUserHandler = loginUserHandler;
const verifyUserTokenHandler = (tokenUser) => {
    try {
        if ((0, lodash_1.isNil)(tokenUser) || (0, lodash_1.isEmpty)(tokenUser)) {
            throw new Error("token is required");
        }
        const secretKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secretkey";
        const decoded = jsonwebtoken_1.default.verify(tokenUser, secretKey);
        if ((0, lodash_1.isNil)(decoded)) {
            throw new Error("Invalid token");
        }
        return {
            success: true,
            message: "User authenticated successfully",
            data: {
                userId: decoded['userId'],
                accessId: decoded['accessId']
            }
        };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.verifyUserTokenHandler = verifyUserTokenHandler;
//# sourceMappingURL=auth.service.js.map