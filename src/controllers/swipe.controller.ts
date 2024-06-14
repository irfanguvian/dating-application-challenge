import { Request, Response } from 'express';
import { swipeHandler } from '../services/swipe.service';

async function swipeUserController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to swipe user",
    }
    try {
        req.body.userId = req.context.user_id;
        req.body.isPremium = req.context.is_premium;
        const swipedUser = await swipeHandler(req.body);
        result.message = swipedUser.message;
        result.success = swipedUser.success;
        return res.status(200).json(result);
    } catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}

export {
    swipeUserController
};