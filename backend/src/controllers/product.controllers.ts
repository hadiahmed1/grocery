import Product from '../models/product.model';
import { ProductCreationAttributes } from '../types/product.type';
import { Request, Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import httpStatus from '../constants/httpStatusCode';
import Address from '../models/adress.model';
import uploadToCloudinary from '../helper/uploadToCloudinary';
import productRating from '../helper/productRating';
import io from '../config/expressConfig';

//seller
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    //extraction product object
    const product: ProductCreationAttributes = req.body;
    //checking if user is present
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    // checking if address is present
    if (! await Address.findOne({
        where: {
            id: req.body.address_id,
            user_id: req.user.id
        }
    })) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Address");
    product.seller_id = req.user.id;
    //uploading photo
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };
    const path =
        (req.files && Array.isArray(files.photo) && files.photo.length > 0)
            ? files?.photo[0]?.path : "";
    if (!path) throw new ApiError(httpStatus.BAD_REQUEST, "Image required");

    const photo = await uploadToCloudinary(path);
    req.body.photo = photo?.secure_url;

    //creating new product
    const newProduct = Product.build(product);
    await newProduct.save();
    //emitting event
    io.emit("newproduct", newProduct);
    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { product: newProduct }));
});

//seller
export const editProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    //if product not found || other seller's product
    if (!product || product.seller_id != req.user?.id) throw new ApiError(httpStatus.NOT_FOUND, "No product found");
    //checking if address is valid
    if (req.body?.address_id) {
        if (! await Address.findOne({
            where: {
                id: req.body.address_id,
                user_id: req.user.id
            }
        })) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Address");
    }
    //checking for photo
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };
    const path =
        (req.files && Array.isArray(files.photo) && files.photo.length > 0)
            ? files?.photo[0]?.path : "";
    //uploading photo
    if (path) {
        const photo = await uploadToCloudinary(path);
        req.body.photo = photo?.secure_url;
    }

    //editing Product
    product.set(req.body);
    product.save();
    io.emit("editedproduct", product);
    return res.status(httpStatus.OK).send(new ApiResponse("Product edited successfully", { product }));
});
//seller
export const getMyProducts = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    const products = await Product.findAll({ where: { seller_id: user?.id } });//sellers products
    return res.status(httpStatus.OK).send(new ApiResponse(products.length + " Products", { products }));
});

//open
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({ offset, limit });//all products
    const productsWithRating = await Promise.all(products.map(async product => {
        const p = product.dataValues;
        p.rating = await productRating(product.id);
        return p;
    }))
    return res.status(httpStatus.OK).send(new ApiResponse(products.length + " Products", {
        products: productsWithRating,
        total: count,
        page,
        hasMore: (offset + products.length) < count
    }));
});
//open
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "No product found");
    return res.status(httpStatus.OK).send(new ApiResponse("Product:" + product.id, { product }));
});