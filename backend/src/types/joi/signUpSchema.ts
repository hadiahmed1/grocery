import Joi from 'joi';

const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required().required(),
    user_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5).required(),
    role: Joi.string().valid('user','seller')
}).unknown(false);

export default signUpSchema;