import 'dotenv/config';
import {getUsers} from './src/service/users';

const users = await getUsers();

console.log(users);
