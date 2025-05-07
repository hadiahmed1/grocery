import { Request } from "express";
import { UserAttributes } from './user.type';

export interface AuthenticatedRequest extends Request {
    user: UserAttributes;
}