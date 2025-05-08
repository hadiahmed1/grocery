import 'dotenv/config';
// import CartItem from './src/models/cartItem.model'
import User from './src/models/user.model'
// import { ProductCreationAttributes } from './src/types/product.type';

// const newProduct : ProductCreationAttributes= {
//     seller_id: 'b2281710-f4b3-42dc-a29b-bc3d34f76118',
//     name: "Potato",
//     mrp: 50,
//     discount_percent: 20.078,
//     stock: 50.6987,
//     quantity: 2,
//     unit: 'kg'
// }

// const product=Product.build(newProduct);
// await product.save()

// Product.sync({force: true})
// CartItem.sync({ alter: true })
User.sync({alter: true})