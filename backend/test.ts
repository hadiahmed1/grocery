import 'dotenv/config'
import Address from './src/models/adress.model';
import CartItem from './src/models/cartItem.model';
import Product from './src/models/product.model';
import User from './src/models/user.model';
import Order from './src/models/order.model';
import OrderItem from './src/models/orderItem.model';
import Review from './src/models/review.model';



const resetDB = async () => {
    await Address.sync({ alter: true });
    await User.sync({ alter: true });
    await CartItem.sync({ alter: true });
    await Product.sync({ alter: true });
    await Order.sync({ alter: true });
    await OrderItem.sync({ alter: true });
    await Review.sync({ alter: true });
}

export default resetDB;