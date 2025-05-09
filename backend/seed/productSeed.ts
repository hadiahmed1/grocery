import User from '../src/models/user.model';
import Product from '../src/models/product.model';
import Address from '../src/models/adress.model';
import { ProductCreationAttributes } from '../src/types/product.type';
import { faker } from '@faker-js/faker'

const createProduct = async (id: string) => {
    const productcount = Math.floor(Math.random() * 5) + 1;//1-5 products
    const addresses = await Address.findAll({ where: { user_id: id } });
    for (let i = 0; i < productcount; i++) {
        const product: ProductCreationAttributes = {
            seller_id: id,
            mrp: Math.random() * Math.random() * 99999,
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            discount_percent: Math.random() * 90,
            quantity: Math.random() * 100,
            unit: ['piece', 'units', 'kg', 'g', 'mg', 'lb', 'ml', 'l'][Math.floor(Math.random() * 8)],
            stock: Math.random() * 100,
            address_id: (addresses[Math.floor(Math.random() * addresses.length)]).id
        }
        Product.build(product).save();
    }
}



const productSeed = async () => {
    await Product.sync({ force: true });
    const sellers = await User.findAll({ where: { isVerified: true, role: 'seller' } });
    sellers.forEach(async (seller) => {
        createProduct(seller.id)
    });
    console.log("Product seed done");
}

export default productSeed;
