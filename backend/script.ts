import "dotenv/config";
import app from "./src/config/expressConfig";
import {getUsers, insertUser} from './src/service/users'
import { NewUser } from "./src/types/user.type";

app.get('/', (req, res) => {
    res.send('Hello World! TS')
});

const newUser: NewUser ={
    username: "hadi",
    email: "email@gmail.com",
    phno: "5638748",
    user_password: "pass"
}
await insertUser(newUser);

console.log(await getUsers())