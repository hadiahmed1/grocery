import 'dotenv/config';
import ratingSeed from './ratingSeed';
import userSeed from "./userSeed";
import addressSeed from './addressSeed';
import productSeed from './productSeed';
import cartItemSeed from './cartItemSeed';
import Order from '../src/models/order.model';
import OrderItem from '../src/models/orderItem.model';

const seeder = async () => {
    await Order.sync({ force: true });
    await OrderItem.sync({ force: true });
    await userSeed(20);
    await addressSeed();
    await productSeed();
    await cartItemSeed();
    await ratingSeed();
    console.log("Seeder Done")
}

export default seeder;