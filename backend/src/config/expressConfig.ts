import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { createServer } from "node:http";
import userRouter from '../routes/userRoute';
import productRouter from '../routes/productRoute';
import cartRouter from '../routes/cartRoute';
import addressRouter from "../routes/addressRoute";
import orderRouter from "../routes/orderRoute";
import reviewRouter from "../routes/reviewRoute";
import { updatePaymentStatus } from "../controllers/order.contollers";
import { swaggerSpec } from "./swaggerConfig";

const app = express();

//route to handle stripe webhook
app.post('/webhook', express.raw({ type: 'application/json' }), updatePaymentStatus);

//middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//nested routes
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);


const server = createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
export default server;