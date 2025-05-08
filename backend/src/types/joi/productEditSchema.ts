import Joi from "joi"

const productEditSchema = Joi.object({
    name: Joi.string(),
    mrp: Joi.number().min(1),
    discount_percent: Joi.number().min(0).max(99.99),
    quantity: Joi.number().min(1),
    unit: Joi.string().valid('piece', 'units', 'kg', 'g', 'mg', 'lb', 'ml', 'l'),
    photo: Joi.string(),
    description: Joi.string(),
    stock: Joi.number().min(0),
    address_id: Joi.string(),
});

export default productEditSchema;