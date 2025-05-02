import "dotenv/config";
import app from "./src/config/expressConfig.js";

app.get('/', (req, res) => {
    res.send('Hello World!')
})