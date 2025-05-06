import 'dotenv/config';
import User from './src/models/user.model';
User.sync({force: true});