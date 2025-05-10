import "dotenv/config";
import './src/types/express/index.d'
import app from "./src/config/expressConfig";
import './src/helper/updateDeliveryStatus.cron';

app.get('/', (req, res) => {
    res.send('Hello World! TS')
});
