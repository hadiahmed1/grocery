import 'dotenv/config';
import {findUserByEmail} from './src/service/users';

const users = await findUserByEmail('qjhvla@gmail.com')

console.log(users);
