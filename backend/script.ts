import "dotenv/config";
import './src/types/express/index.d'
import app from "./src/config/expressConfig";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
});
