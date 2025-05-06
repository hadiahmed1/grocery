import express from 'express';
import { getUser, register, signinUser, verifyUser } from '../controllers/user.controllers';
import { verifyAccessToken, verifyVerificationToken } from '../middleware/verifyToken';


const userRouter = express.Router();
userRouter.post('/signup', register);
userRouter.post('/signin', signinUser);
userRouter.get('/', verifyAccessToken, getUser);
userRouter.get('/verify/:token', verifyVerificationToken, verifyUser);


export default userRouter;