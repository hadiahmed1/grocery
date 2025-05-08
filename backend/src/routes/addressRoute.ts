import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import validateData from '../middleware/validateSchema';
import addressCreationSchema from '../types/joi/addressCreationSchema';
import { createAddress, editAddress, getAddress } from '../controllers/address.controllers';
import addressEditSchema from '../types/joi/addressEditSchema';

const addressRouter = express.Router();

addressRouter.get('/', verifyAccessToken, getAddress);
addressRouter.post('/', verifyAccessToken, validateData(addressCreationSchema), createAddress);
addressRouter.patch('/:id', verifyAccessToken, validateData(addressEditSchema), editAddress);
export default addressRouter;