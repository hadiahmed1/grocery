import "dotenv/config";
import './src/types/express/index.d'
import app from "./src/config/expressConfig";
import './src/helper/updateDeliveryStatus.cron';
import { sendRandomNotification } from './src/config/pusherConfig'
app.get('/', (req, res) => {
    res.send('Hello World! TS')
});
sendRandomNotification();