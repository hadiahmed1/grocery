import 'dotenv/config'
import Address from './src/models/adress.model';
// import User from './src/models/user.model';
Address.sync({ force: true })
// User.sync({ alter: true });