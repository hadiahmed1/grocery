import "dotenv/config";
import './src/types/express/index'
import app from "./src/config/expressConfig";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
});
