import "dotenv/config";
import {getUserById, getUsers, insertUser, verifyUser} from './src/service/users'
import { NewUser } from "./src/types/user.type";

import {getProducts } from "./src/service/product"
// const newUser: NewUser ={
//     username:"blink",
//     email: "blink@gmail.com",
//     phno: "5378468",
//     user_password: "pass",
//     role: 'seller'
// }
// await insertUser(newUser);


// const users=await getUsers();
// await verifyUser(users[2].id);
// users.forEach(async user => {
//     console.log(await getUserById(user.id))
// });

const products = await getProducts();
console.log(products);