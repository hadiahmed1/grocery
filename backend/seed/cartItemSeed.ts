import User from '../src/models/user.model';
import CartItem from '../src/models/cartItem.model';
import Product from '../src/models/product.model';
const cartItemSeed = async () => {
    await CartItem.sync({ force: true });
    const users = await User.findAll({ where: { isVerified: true } });
    const products = await Product.findAll();
    users.forEach(user => {
        const itemcount = Math.floor(Math.random() * 5);
        const random = Math.floor(Math.random() * 1000);
        for (let i = 0; i < itemcount; i++) {
            const cartItem = {
                user_id: user.id,
                product_id: products[random % products.length-1].dataValues.id,
                count: Math.floor(Math.random() * 10)
            }
            CartItem.build(cartItem).save();
        }
    });
    console.log("Cart Item seed done");
}

export default cartItemSeed;