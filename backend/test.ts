import 'dotenv/config';
import User from './src/models/user.model';
import dbConnection from './src/config/sequelizeConfig';

import {insertUser} from './src/service/users';
import { NewUserType } from './src/types/user.type';
await User.sync({ alter: true });
// const user:NewUserType = {
//     username: "Hadi",
//     email: "hadi13@gmail.com",
//     user_password: "pass"
// }

insertUser(user);