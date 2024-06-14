import { Request, Response } from 'express';
import { createNewSubcriptionHandler, updateSubcriptionStatusHandler } from '../services/subcription.service';

async function createNewSubcriptionController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to create new subcription",
    }
    try {
        const context = req.context
        const createSubs = await createNewSubcriptionHandler(context);
        
        result.message = createSubs.message;
        result.success = createSubs.success;
        return res.status(200).json(result);
    } catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}

async function updatePaymentOrderController (req: Request, res: Response) {
    const result = {
        success: false,
        message: "Failed to create new subcription",
    }
    try {
        req.body.userId = req.context.user_id;
        const createSubs = await updateSubcriptionStatusHandler(req.body);
        result.message = createSubs.message;
        result.success = createSubs.success;
        return res.status(200).json(result);
    } catch (error) {
        result.message = error.message;
        return res.status(500).json(result);
    }
}

export {
    updatePaymentOrderController,
    createNewSubcriptionController
};