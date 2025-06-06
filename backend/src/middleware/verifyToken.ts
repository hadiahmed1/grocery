import jwt from 'jsonwebtoken';
import ApiError from '../helper/ApiError';
import TokenPayloadType from '../types/token.type';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import asyncHandler from '../helper/asyncHandler';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import httpStatus from '../constants/httpStatusCode';
import { OAuth2Client } from 'google-auth-library';

const verifyToken = async (token: string, type: 'accessToken' | 'verificationToken') => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as TokenPayloadType;
        if (decoded.type !== type) throw new ApiError(401, "Invalid Token Type");
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'username', 'email', 'phno', 'isVerified', 'role', 'createdAt', 'deletedAt', 'updatedAt']
        }
        );
        if (!user) throw new ApiError(400, "User not found");
        return user;
    } catch (err) {
        console.log(err);
        throw new ApiError(401, "Invalid or Expired Jwt");
    }
}

export const verifyVerificationToken = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    const { token } = req.params;
    const user = await verifyToken(token, 'verificationToken');
    (req as AuthenticatedRequest).user = user.dataValues;
    next();
});

export const verifyAccessToken = asyncHandler(async (req: Request, Response: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    if (!token) throw new ApiError(401, "No token: Unauthorized");
    const user = await verifyToken(token, 'accessToken');
    (req as AuthenticatedRequest).user = user.dataValues;
    next();
});

export const verifySeller = asyncHandler(async (req: Request, Response: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    if (!token) throw new ApiError(401, "No token: Unauthorized");
    const user = await verifyToken(token, 'accessToken');
    console.log()
    if (user.dataValues.role !== 'seller') throw new ApiError(401, "Not seller");

    (req as AuthenticatedRequest).user = user.dataValues;
    next();
});

export const verifyGoogleSignin = asyncHandler(async (req: Request, Response: Response, next: NextFunction) => {
    //extracting token
    const token = req.body?.accessToken;
    if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, "No token: Unauthorized");

    //decoding token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
    });
    const payload = ticket.getPayload();
    if (!payload) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    const email = payload['email'] || "";

    //finding user
    const user = await User.findOne({ where: { email } });
    if (user) {//setting user
        (req as AuthenticatedRequest).user = user.dataValues;
    } else {//creating user
        const newUser = await User.create({
            email,
            username: payload['name'] || "",
            role: "user",
            user_password: "temporary password"
        });
        (req as AuthenticatedRequest).user = newUser.dataValues;
    }
    next();

});