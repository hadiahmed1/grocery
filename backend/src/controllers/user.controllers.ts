import { Request, Response } from 'express';
import User from '../models/user.model';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import sendEmail from '../helper/sendEmail';
import { findUserByEmail } from '../service/users';

export const register = asyncHandler(async (req: Request, res: Response) => {
    //checking for duplicate emailId
    if( await findUserByEmail(req.body.email)) throw new ApiError(400, "Unable to register: Email Already in Use");
    //registering user
    const user = User.build(req.body);
    await user.save();
    //sending verification email
    sendEmail(req.body.email, user.dataValues.id);
    return res.status(200).send(new ApiResponse("User created successfully", { userId: user.dataValues.id }));
});