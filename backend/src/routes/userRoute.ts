import express from 'express';
import { register, signinUser, verifyUser } from '../controllers/user.controllers';
import { verifyVerificationToken } from '../middleware/verifyToken';
const userRouter = express.Router();

userRouter.post('/signup', register);
userRouter.post('/signin', signinUser);
userRouter.get('/verify/:token', verifyVerificationToken, verifyUser);


export default userRouter;