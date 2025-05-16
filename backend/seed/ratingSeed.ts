import Product from '../src/models/product.model';
import User from '../src/models/user.model';
import Review from '../src/models/review.model';

const ratingSeed = async () => {
    const products = await Product.findAll();
    const users = await User.findAll();

    products.forEach(product => {
        users.forEach(user => {
            Review.create({
                user_id: user.id,
                product_id: product.id,
                rating: Math.ceil(Math.random() * 5)
            })
        })
    })
}

export default ratingSeed;