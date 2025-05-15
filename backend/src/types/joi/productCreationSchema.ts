import Joi from "joi"

const productCreationSchema = Joi.object({
    name: Joi.string().required(),
    mrp: Joi.number().min(1).required(),
    discount_percent: Joi.number().min(0).max(99.99),
    quantity: Joi.number().min(1),
    unit: Joi.string().valid('piece', 'units', 'kg', 'g', 'mg', 'lb', 'ml', 'l'),
    description: Joi.string(),
    stock: Joi.number().min(1),
    address_id: Joi.string().required(),
});

export default productCreationSchema;