import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import ApiError from "../helper/ApiError";
import httpStatus from "../constants/httpStatusCode";
import asyncHandler from "../helper/asyncHandler";

const validateData = (schema: ObjectSchema) => {//function to validate req based on schema
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) //invalid request
            throw new ApiError(httpStatus.BAD_REQUEST, error.details[0].message, error.details.map(err => err.message));
        next();
    })
}

export default validateData;