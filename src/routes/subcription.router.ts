import { createNewSubcriptionController, updatePaymentOrderController } from '../controllers/subscription.controller';
import express from 'express';

const subcriptionRouter = express.Router();

subcriptionRouter.post('/create-subcription', createNewSubcriptionController);
subcriptionRouter.post('/update-payment', updatePaymentOrderController);

export default subcriptionRouter;