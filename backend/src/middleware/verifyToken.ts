import jwt from 'jsonwebtoken';
import ApiError from '../helper/ApiError';
import TokenPayloadType from '../types/token.type';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import asyncHandler from '../helper/asyncHandler';

const verifyToken = async (token: string, type: 'accessToken' | 'verificationToken') => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as TokenPayloadType;
        if (decoded.type !== type) throw new ApiError(401, "Invalid Token Type");
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'username', 'email', 'phno', 'isVerified', 'address_id', 'createdAt', 'deletedAt', 'updatedAt']
        }
        );
        if (!user) throw new ApiError(400, "User not found");
        return user;
    } catch (err) {
        console.log(err);
        throw new ApiError(401, "Invalid or Expired Jwt");
    }
}

export const verifyVerificationToken = asyncHandler(async (req: Request, Response: Response, next: NextFunction) => {
    const { token } = req.params;
    const user = await verifyToken(token, 'verificationToken');
    (req as any).user = user.dataValues;
    next();
});

export const verifyAccessToken = asyncHandler(async (req: Request, Response: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    if (!token) throw new ApiError(401, "No token: Unauthorized");
    const user = await verifyToken(token, 'accessToken');
    (req as any).user = user.dataValues;
    next();
});