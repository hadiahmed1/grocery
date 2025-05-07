import Joi from 'joi';

const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    user_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5)
}).unknown(false);

export default signUpSchema;