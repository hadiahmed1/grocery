import 'dotenv/config';
import userSeed from "./userSeed";

const seeder =()=>{
    userSeed(20);
}

seeder();