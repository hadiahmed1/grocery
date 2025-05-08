import Address from "../models/adress.model";
import asyncHandler from "../helper/asyncHandler";
import ApiResponse from "../helper/ApiResponse";
import ApiError from "../helper/ApiError";
import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";

export const createAddress = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //extracting address
    const address = req.body;
    //adding user_id to address
    address.user_id = req.user.id;
    //creating address
    const newAddress = Address.build(address);
    await newAddress.save();
    return res.status(httpStatus.OK)
        .send(new ApiResponse("Address created successfully", { address: newAddress }));
});

export const editAddress = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding address
    const address = await Address.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        }
    });
    if (!address) throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
    //editing address
    address.set(req.body);
    await address.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Address edited successfully", { address }));
});

export const getAddress = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const addresses = await Address.findAll({
        where: { user_id: req.user.id }
    })
    return res.status(httpStatus.OK)
        .send(new ApiResponse("Address created successfully", { addresses }));
});