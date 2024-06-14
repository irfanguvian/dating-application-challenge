import { currentUserController, getListUserSwipeController } from '../controllers/user.controller';
import express from 'express';

const userRouter = express.Router();
userRouter.get('/user-swipe-list', getListUserSwipeController);
userRouter.get('/current-user', currentUserController);

export default userRouter;