import Joi from "joi";

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).unknown(false);

export default signInSchema;