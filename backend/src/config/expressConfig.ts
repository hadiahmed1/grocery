import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from '../routes/userRoute';
import productRouter from '../routes/productRoute';
import cartRouter from '../routes/cartRoute';
import addressRouter from "../routes/addressRoute";

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const port = process.env.PORT;

//nested routes
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

export default app;