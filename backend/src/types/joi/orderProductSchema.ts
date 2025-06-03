import Joi from 'joi';

const orderProductSchema = Joi.object({
    product_id: Joi.string().max(50).required(),
    quantity: Joi.number().min(1)
}).unknown(false);

export default orderProductSchema;