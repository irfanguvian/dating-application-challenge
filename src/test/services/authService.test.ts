import { signupUserHandler, loginUserHandler, verifyUserTokenHandler } from '../../services/auth.service';
import { createNewUser, getUserByUsername, updateUserLogin } from '../../repository/user.repository';
import { createNewUserDetail } from '../../repository/user-detail.repository';
import { createTokenUser, deleteTokenUser } from '../../repository/auth-token.repository';
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken';
import { connection } from '../../index';

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

            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
            (createNewUser as jest.Mock).mockResolvedValue([{ id: 1 }]);
            (createNewUserDetail as jest.Mock).mockResolvedValue(true);

            const result = await signupUserHandler(mockUserData);

            expect(connection.transaction).toHaveBeenCalled();

            expect(result.success).toBe(true);
            expect(result.message).toBe('User created successfully');
            expect(createNewUser).toHaveBeenCalledWith({ username: 'testuser@example.com', password: 'hashedpassword' }, expect.anything());
            expect(createNewUserDetail).toHaveBeenCalledWith({ email: 'testuser@example.com', firstName: 'Test', lastName: 'User', userId: 1 }, expect.anything());
        });

        it('should throw an error if passwords do not match', async () => {
            const invalidUserData = { ...mockUserData, retypePassword: 'differentpassword' };

            await expect(signupUserHandler(invalidUserData)).rejects.toThrow('password and retypePassword should be same');
        });

        it('should throw an error if required fields are missing', async () => {
            const incompleteUserData = { ...mockUserData, username: '' };

            await expect(signupUserHandler(incompleteUserData)).rejects.toThrow('Username is required');
        });

        it('should throw an error if email is invalid', async () => {
            const invalidEmailData = { ...mockUserData, username: 'invalid-email' };

            await expect(signupUserHandler(invalidEmailData)).rejects.toThrow('Invalid email address');
        });
    });

    describe('loginUserHandler', () => {
        const mockLoginData = {
            username: 'testuser@example.com',
            password: 'password'
        };

        it('should login a user successfully', async () => {
            const user = { id: 1, username: 'testuser@example.com', password: 'hashedpassword' };
            (getUserByUsername as jest.Mock).mockResolvedValue([user]);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (updateUserLogin as jest.Mock).mockResolvedValue(true);
            (deleteTokenUser as jest.Mock).mockResolvedValue(true);
            (createTokenUser as jest.Mock).mockResolvedValue(true);

            (jwt.sign as jest.Mock).mockReturnValue('mocktoken');

            const result = await loginUserHandler(mockLoginData);

            expect(result.success).toBe(true);
            expect(result.message).toBe('User login successfully');
            expect(result.data.token).toBe('mocktoken');
        });

        it('should throw an error if username is not provided', async () => {
            const invalidLoginData = { ...mockLoginData, username: '' };

            await expect(loginUserHandler(invalidLoginData)).rejects.toThrow('Username is required');
        });

        it('should throw an error if password is not provided', async () => {
            const invalidLoginData = { ...mockLoginData, password: '' };

            await expect(loginUserHandler(invalidLoginData)).rejects.toThrow('password is required');
        });

        it('should throw an error if email is invalid', async () => {
            const invalidEmailData = { ...mockLoginData, username: 'invalid-email' };

            await expect(loginUserHandler(invalidEmailData)).rejects.toThrow('Invalid email address');
        });

        it('should throw an error if user is not found', async () => {
            (getUserByUsername as jest.Mock).mockResolvedValue([]);

            await expect(loginUserHandler(mockLoginData)).rejects.toThrow('User not found');
        });

        it('should throw an error if password is incorrect', async () => {
            const user = { id: 1, username: 'testuser@example.com', password: 'hashedpassword' };
            (getUserByUsername as jest.Mock).mockResolvedValue([user]);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(loginUserHandler(mockLoginData)).rejects.toThrow('wrong password, try again');
        });
    });

    describe('verifyUserTokenHandler', () => {
        const token = 'mocktoken';
        const decoded = { userId: 1, accessId: 'uuid' };
        const secretKey = process.env.JWT_SECRET || 'secretkey';

        it('should verify the token successfully', () => {
            (jwt.verify as jest.Mock).mockReturnValue(decoded);

            const result = verifyUserTokenHandler(token);

            expect(result.success).toBe(true);
            expect(result.message).toBe('User authenticated successfully');
            expect(result.data.userId).toBe(decoded.userId);
            expect(result.data.accessId).toBe(decoded.accessId);
        });

        it('should throw an error if token is not provided', () => {
            expect(() => verifyUserTokenHandler('')).toThrow('token is required');
        });

        it('should throw an error if token is invalid', () => {
            (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

            expect(() => verifyUserTokenHandler(token)).toThrow('Invalid token');
        });
    });
});
