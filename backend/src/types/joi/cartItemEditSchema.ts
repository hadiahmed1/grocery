import Joi from "joi";

const cartItemeEditSchema = Joi.object({
    count: Joi.number().min(1).required()
}).unknown(false);

export default cartItemeEditSchema;