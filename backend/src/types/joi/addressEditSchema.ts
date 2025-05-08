import Joi from 'joi';

const addressEditSchema = Joi.object({
    name: Joi.string().max(50),
    line1: Joi.string().max(50),
    line2: Joi.string().max(50),
    city: Joi.string().max(50),
    state: Joi.string().max(50),
    pincode: Joi.string().max(16),
    landmark: Joi.string().max(50),
}).unknown(false);

export default addressEditSchema;