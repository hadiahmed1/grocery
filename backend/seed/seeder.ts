import 'dotenv/config';
import userSeed from "./userSeed";
import addressSeed from './addressSeed';
import productSeed from './productSeed';
import cartItemSeed from './cartItemSeed';

const seeder = async (n: number) => {
    await userSeed(n);
    await addressSeed();
    await productSeed();
    await cartItemSeed();
    console.log("Seeder Done")
}

seeder(20);