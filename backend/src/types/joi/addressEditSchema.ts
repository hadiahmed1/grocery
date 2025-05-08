import Joi from 'joi';

const addressEditSchema = Joi.object({
    name: Joi.string().max(50),
    line1: Joi.string().required().max(50),
    line2: Joi.string().required().max(50),
    city: Joi.string().required().max(50),
    state: Joi.string().required().max(50),
    pincode: Joi.string().required().max(16),
    landmark: Joi.string().required().max(50),
}).unknown(false);

export default addressEditSchema;