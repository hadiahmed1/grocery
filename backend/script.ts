import "dotenv/config";
import app from "./src/config/expressConfig";
import dbConnnection from "./src/config/sqlConfig"
import { Connection } from "mysql2/typings/mysql/lib/Connection";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
})
const dbConnection :Connection = dbConnnection();