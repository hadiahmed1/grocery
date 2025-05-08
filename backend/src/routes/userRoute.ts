import express from 'express';
import { getUser, logoutUser, register, signinUser, verifyUser } from '../controllers/user.controllers';
import { verifyAccessToken, verifyVerificationToken } from '../middleware/verifyToken';
import validateData from '../middleware/validateSchema';
import signInSchema from '../types/joi/signInSchema';
import signUpSchema from '../types/joi/signUpSchema';

const userRouter = express.Router();
userRouter.post('/signup', validateData(signUpSchema), register);
userRouter.post('/signin', validateData(signInSchema), signinUser);

//protected routes (will have access to req.user)
userRouter.get('/', verifyAccessToken, getUser);
userRouter.get('/verify/:token', verifyVerificationToken, verifyUser);
userRouter.get('/logout', logoutUser);

export default userRouter;