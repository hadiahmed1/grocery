import "dotenv/config";
import app from "./src/config/expressConfig";
import {getUserById, getUsers, insertUser, verifyUser} from './src/service/users'
import { NewUser } from "./src/types/user.type";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
});

// const newUser: NewUser ={
//     username: "qadir ahmed",
//     email: "qadir@gmail.com",
//     phno: "5633438",
//     user_password: "pass"
// }
// await insertUser(newUser);


const users=await getUsers();
await verifyUser(users[2].id);
users.forEach(async user => {
    console.log(await getUserById(user.id))
});