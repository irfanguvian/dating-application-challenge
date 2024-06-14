import { swipeUserController } from '../controllers/swipe.controller';
import express from 'express';

const swipeRouter = express.Router();
swipeRouter.post('/user-swipe', swipeUserController);

export default swipeRouter;