import 'dotenv/config'
import Address from './src/models/adress.model';
import CartItem from './src/models/cartItem.model';
import Product from './src/models/product.model';
import User from './src/models/user.model';

Address.sync({ alter: true })
User.sync({ alter: true });
CartItem.sync({alter: true});
Product.sync({alter: true})