import { Request, Response } from "express";
const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: Function) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }
}

export default asyncHandler;