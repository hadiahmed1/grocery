import { Request, Response } from 'express';
import User from '../models/user.model';
import ApiResponse from '../helper/ApiResponse';
import asyncHandler from '../helper/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = User.build(req.body);
    await user.save();
    console.log(user);
    return res.status(200).send(new ApiResponse("User created successfully", { userId: user.dataValues.id }));
})