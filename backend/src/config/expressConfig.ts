import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from '../routes/userRoute';
import productRouter from '../routes/productRoute';
import cartRouter from '../routes/cartRoute';
import addressRouter from "../routes/addressRoute";
import orderRouter from "../routes/orderRoute";
import reviewRouter from "../routes/reviewRoute";

const app = express();
//middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT;

//nested routes
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

export default app;