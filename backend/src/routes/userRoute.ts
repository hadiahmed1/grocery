import express from 'express';
import { register } from '../controllers/user.controllers'; 
const userRouter = express.Router();

userRouter.post('/signup', register);

export default userRouter;