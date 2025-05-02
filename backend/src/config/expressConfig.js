import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

export default app;