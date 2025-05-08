import 'dotenv/config'
import Address from './src/models/adress.model';
Address.sync({force: true})