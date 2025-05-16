import Joi from "joi";

const reviewCreationSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    review: Joi.string().max(250)
}).unknown(false);

export default reviewCreationSchema;