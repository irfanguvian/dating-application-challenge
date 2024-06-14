import { Request, Response } from 'express';
import { loginUserHandler, signupUserHandler } from '../services/auth.service';

async function signupController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to signup user"
    }
    try {
        const signupRes = await signupUserHandler(req.body);
        result.message = signupRes.message;
        result.success = signupRes.success;

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(result);
    }
}

async function loginController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to login user",
        data: {
            token: ""
        }
    }
    try {
        const result = await loginUserHandler(req.body);
        result.data.token = result.data.token;
        result.success = result.success;
        result.message = result.message;

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(result);
    }
}

export {
    signupController,
    loginController
};