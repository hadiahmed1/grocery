import 'dotenv/config';
import userSeed from "./userSeed";
import addressSeed from './addressSeed';

const seeder = async () => {
    // await userSeed(20);
    await addressSeed(35);
}

seeder();