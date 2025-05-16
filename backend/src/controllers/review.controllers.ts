import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";
import ApiResponse from "../helper/ApiResponse";
import asyncHandler from "../helper/asyncHandler";
import Review from "../models/review.model";
import ApiError from "../helper/ApiError";
import Product from "../models/product.model";

export const addReview = asyncHandler(async (req: Request, res: Response) => {
    const user_id = req.user?.id;
    if (!user_id) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const product_id = req.params.id;
    const product = await Product.findByPk(product_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    const { review, rating } = req.body;
    const rev = await Review.create({
        user_id, product_id, review, rating
    })
    res.status(httpStatus.OK).send(new ApiResponse("Product reviwed", {}));
});