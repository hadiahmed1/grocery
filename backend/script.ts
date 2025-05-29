import "dotenv/config";
import './src/types/express/index.d'
import "./src/config/expressConfig";
import './src/helper/updateDeliveryStatus.cron';
import resetDB from "./test";

await resetDB();