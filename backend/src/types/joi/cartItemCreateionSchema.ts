import Joi from "joi";

const cartItemCreateionSchema = Joi.object({
    product_id: Joi.string().required().required(),
    count: Joi.number().min(1)
}).unknown(false);

export default cartItemCreateionSchema;