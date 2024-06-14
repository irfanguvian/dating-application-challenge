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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../../services/auth.service");
const user_repository_1 = require("../../repository/user.repository");
const user_detail_repository_1 = require("../../repository/user-detail.repository");
const auth_token_repository_1 = require("../../repository/auth-token.repository");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../../index");
jest.mock('../../repository/user.repository');
jest.mock('../../repository/user-detail.repository');
jest.mock('../../repository/auth-token.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../index', () => ({
    connection: {
        transaction: jest.fn().mockImplementation((callback) => {
            return callback('mockTransaction');
        }),
    },
}));
describe('Auth Service', () => {
    describe('signupUserHandler', () => {
        const mockUserData = {
            username: 'testuser@example.com',
            password: 'password',
            retypePassword: 'password',
            firstName: 'Test',
            lastName: 'User'
        };
        it('should signup a new user successfully', async () => {
            bcrypt.hash.mockResolvedValue('hashedpassword');
            user_repository_1.createNewUser.mockResolvedValue([{ id: 1 }]);
            user_detail_repository_1.createNewUserDetail.mockResolvedValue(true);
            const result = await (0, auth_service_1.signupUserHandler)(mockUserData);
            expect(index_1.connection.transaction).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.message).toBe('User created successfully');
            expect(user_repository_1.createNewUser).toHaveBeenCalledWith({ username: 'testuser@example.com', password: 'hashedpassword' }, expect.anything());
            expect(user_detail_repository_1.createNewUserDetail).toHaveBeenCalledWith({ email: 'testuser@example.com', firstName: 'Test', lastName: 'User', userId: 1 }, expect.anything());
        });
        it('should throw an error if passwords do not match', async () => {
            const invalidUserData = { ...mockUserData, retypePassword: 'differentpassword' };
            await expect((0, auth_service_1.signupUserHandler)(invalidUserData)).rejects.toThrow('password and retypePassword should be same');
        });
        it('should throw an error if required fields are missing', async () => {
            const incompleteUserData = { ...mockUserData, username: '' };
            await expect((0, auth_service_1.signupUserHandler)(incompleteUserData)).rejects.toThrow('Username is required');
        });
        it('should throw an error if email is invalid', async () => {
            const invalidEmailData = { ...mockUserData, username: 'invalid-email' };
            await expect((0, auth_service_1.signupUserHandler)(invalidEmailData)).rejects.toThrow('Invalid email address');
        });
    });
    describe('loginUserHandler', () => {
        const mockLoginData = {
            username: 'testuser@example.com',
            password: 'password'
        };
        it('should login a user successfully', async () => {
            const user = { id: 1, username: 'testuser@example.com', password: 'hashedpassword' };
            user_repository_1.getUserByUsername.mockResolvedValue([user]);
            bcrypt.compare.mockResolvedValue(true);
            user_repository_1.updateUserLogin.mockResolvedValue(true);
            auth_token_repository_1.deleteTokenUser.mockResolvedValue(true);
            auth_token_repository_1.createTokenUser.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mocktoken');
            const result = await (0, auth_service_1.loginUserHandler)(mockLoginData);
            expect(result.success).toBe(true);
            expect(result.message).toBe('User login successfully');
            expect(result.data.token).toBe('mocktoken');
        });
        it('should throw an error if username is not provided', async () => {
            const invalidLoginData = { ...mockLoginData, username: '' };
            await expect((0, auth_service_1.loginUserHandler)(invalidLoginData)).rejects.toThrow('Username is required');
        });
        it('should throw an error if password is not provided', async () => {
            const invalidLoginData = { ...mockLoginData, password: '' };
            await expect((0, auth_service_1.loginUserHandler)(invalidLoginData)).rejects.toThrow('password is required');
        });
        it('should throw an error if email is invalid', async () => {
            const invalidEmailData = { ...mockLoginData, username: 'invalid-email' };
            await expect((0, auth_service_1.loginUserHandler)(invalidEmailData)).rejects.toThrow('Invalid email address');
        });
        it('should throw an error if user is not found', async () => {
            user_repository_1.getUserByUsername.mockResolvedValue([]);
            await expect((0, auth_service_1.loginUserHandler)(mockLoginData)).rejects.toThrow('User not found');
        });
        it('should throw an error if password is incorrect', async () => {
            const user = { id: 1, username: 'testuser@example.com', password: 'hashedpassword' };
            user_repository_1.getUserByUsername.mockResolvedValue([user]);
            bcrypt.compare.mockResolvedValue(false);
            await expect((0, auth_service_1.loginUserHandler)(mockLoginData)).rejects.toThrow('wrong password, try again');
        });
    });
    describe('verifyUserTokenHandler', () => {
        const token = 'mocktoken';
        const decoded = { userId: 1, accessId: 'uuid' };
        const secretKey = process.env.JWT_SECRET || 'secretkey';
        it('should verify the token successfully', () => {
            jwt.verify.mockReturnValue(decoded);
            const result = (0, auth_service_1.verifyUserTokenHandler)(token);
            expect(result.success).toBe(true);
            expect(result.message).toBe('User authenticated successfully');
            expect(result.data.userId).toBe(decoded.userId);
            expect(result.data.accessId).toBe(decoded.accessId);
        });
        it('should throw an error if token is not provided', () => {
            expect(() => (0, auth_service_1.verifyUserTokenHandler)('')).toThrow('token is required');
        });
        it('should throw an error if token is invalid', () => {
            jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
            expect(() => (0, auth_service_1.verifyUserTokenHandler)(token)).toThrow('Invalid token');
        });
    });
});
//# sourceMappingURL=authService.test.js.map