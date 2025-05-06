import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from '../routes/userRoute';
import productRouter from '../routes/productRoute';
import cartRouter from '../routes/cartRoute';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

export default app;