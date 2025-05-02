import "dotenv/config";
import app from "./src/config/expressConfig";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
})