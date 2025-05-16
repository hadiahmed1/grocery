import express from "express";
import { verifyAccessToken } from "../middleware/verifyToken";
import validateData from "../middleware/validateSchema";
import reviewCreationSchema from "../types/joi/reviewCreationSchema";
import { addReview, getReviews } from "../controllers/review.controllers";

const reviewRouter = express.Router();

reviewRouter.post('/:id', verifyAccessToken, validateData(reviewCreationSchema), addReview);
reviewRouter.get('/:id', getReviews);

export default reviewRouter;