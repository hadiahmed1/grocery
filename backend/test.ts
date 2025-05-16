import 'dotenv/config'
// import Address from './src/models/adress.model';
// import CartItem from './src/models/cartItem.model';
// import Product from './src/models/product.model';
// import User from './src/models/user.model';
// import Order from './src/models/order.model';
// import OrderItem from './src/models/orderItem.model';


// Address.sync({ alter: true });
// User.sync({ alter: true });
// CartItem.sync({ alter: true });
// Product.sync({ alter: true });
// Order.sync({ force: true })
// OrderItem.sync({ force: true })
import Review from './src/models/review.model';

Review.sync({force: true})