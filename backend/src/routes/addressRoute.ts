import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import validateData from '../middleware/validateSchema';
import addressCreationSchema from '../types/joi/addressCreationSchema';
import { createAddress } from '../controllers/address.controllers';

const addressRouter = express.Router();

addressRouter.post('/', verifyAccessToken, validateData(addressCreationSchema), createAddress);

export default addressRouter;