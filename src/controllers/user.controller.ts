import { currentUser, getListUserSwipe } from '../services/user.service';
import { Request, Response } from 'express';
import { UserDetailType } from 'types/user-detail.repository';

async function getListUserSwipeController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to fetch user",
        data: [] as UserDetailType[]
    }
    try {
        const fetchListUser = await getListUserSwipe(req.context);
        result.message = fetchListUser.message;
        result.success = fetchListUser.success;
        result.data = fetchListUser.data;

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(result);
    }
}

function currentUserController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to login user",
        data: null as null | UserDetailType
    }
    try {
        const user = currentUser(req.context);
        result.success = user.success;
        result.message = user.message;
        result.data = user.data;

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(result);
    }
}

export {
    getListUserSwipeController,
    currentUserController
};