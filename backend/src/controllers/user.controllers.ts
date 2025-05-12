import { Request, Response } from 'express';
import User from '../models/user.model';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import sendEmail from '../helper/sendEmail';
import { findUserByEmail } from '../service/users';
import bcrypt from 'bcryptjs';
import generateToken from '../helper/generateToken';
import httpStatus from '../constants/httpStatusCode';

export const register = asyncHandler(async (req: Request, res: Response) => {
    //checking for duplicate emailId
    if (await findUserByEmail(req.body.email)) throw new ApiError(400, "Unable to register: Email Already in Use");
    //registering user
    console.log(req.body)
    const user = User.build(req.body);
    await user.save();
    //sending verification email
    sendEmail(req.body.email, user.dataValues.id);
    return res.status(httpStatus.OK).send(new ApiResponse("User created successfully", { userId: user.dataValues.id }));
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //verifying user
    await User.update({ isVerified: true }, {
        where: { id: req.user.id }
    })
    return res.status(httpStatus.OK).send(new ApiResponse("User verified", {}));
});

export const signinUser = asyncHandler(async (req: Request, res: Response) => {
    //extracting credentials
    const { email, password } = req.body;
    //finding user
    const user = await findUserByEmail(email);
    //checking if credentials are valid
    if (!user || !bcrypt.compareSync(password, user.user_password))
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
    //checking if user is verified
    if (!user.isVerified) {
        sendEmail(email, user.id);//sending verification email
        throw new ApiError(httpStatus.UNAUTHORIZED, "User not verified: Please check your email a verification email has been sent to you");
    }
    return res.status(httpStatus.OK)//sending cookies to maintain session
        .cookie('accessToken', generateToken('accessToken', user.id, '1h'), { httpOnly: true, secure: true })
        .json(new ApiResponse("Signin successfull", { user: { id: user.id, role: user.role } }));
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("User Found", { user: req.user }));
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    //clearing cookies
    return res.status(httpStatus.OK)
        .clearCookie("accessToken", options)
        .send(new ApiResponse("User logged out", {}));
});