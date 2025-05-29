import 'dotenv/config'
import Address from './src/models/adress.model';
import CartItem from './src/models/cartItem.model';
import Product from './src/models/product.model';
import User from './src/models/user.model';
import Order from './src/models/order.model';
import OrderItem from './src/models/orderItem.model';
import Review from './src/models/review.model';


Address.sync({ force: true });
User.sync({ force: true });
CartItem.sync({ force: true });
Product.sync({ force: true });
Order.sync({ force: true })
OrderItem.sync({ force: true })
Review.sync({ force: true })