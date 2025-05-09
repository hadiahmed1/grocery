import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";
import asyncHandler from "../helper/asyncHandler";
import ApiError from "../helper/ApiError";
import ApiResponse from "../helper/ApiResponse";
import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";


//buyer
export const orderItem = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

export const orderCart = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

//seller & buyer
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});
