import Joi from "joi"

const productCreationSchema = Joi.object({
    name:Joi.string(),
    mrp:Joi.number().min(1),
    discount_percent:Joi.number().min(0).max(99.99),
    quantity:Joi.number().min(1),
    unit:Joi.string().valid([]),
    photo:Joi.string(),
    description:Joi.string(),
    stock:Joi.number().min(1),
    address_id:Joi.string(),
});

export default productCreationSchema;