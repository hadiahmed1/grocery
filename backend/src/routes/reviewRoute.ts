import express from "express";
import { verifyAccessToken } from "../middleware/verifyToken";
import validateData from "../middleware/validateSchema";
import reviewCreationSchema from "../types/joi/reviewCreationSchema";
import { addReview } from "../controllers/review.controllers";

const reviewRouter = express.Router();

reviewRouter.post('/:id', verifyAccessToken, validateData(reviewCreationSchema), addReview);

export default reviewRouter;