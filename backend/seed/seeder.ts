import 'dotenv/config';
import ratingSeed from './ratingSeed';
import userSeed from "./userSeed";
import addressSeed from './addressSeed';
import productSeed from './productSeed';
import cartItemSeed from './cartItemSeed';

const seeder = async () => {
    await userSeed(20);
    await addressSeed();
    await productSeed();
    await cartItemSeed();
    await ratingSeed();
    console.log("Seeder Done")
}

export default seeder;