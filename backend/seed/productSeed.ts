import User from '../src/models/user.model';
import Product from '../src/models/product.model';
import Address from '../src/models/adress.model';
import { ProductCreationAttributes } from '../src/types/product.type';
import { faker } from '@faker-js/faker'

const createProduct = async (id: string, email: string) => {
    console.log("seller:>>", email);
    const addresses = await Address.findAll({ where: { user_id: id } });
    
    for (let i = 0; i < 5; i++) {
        const product: ProductCreationAttributes = {
            seller_id: id,
            mrp: Math.random() * Math.random() * 99999,
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            discount_percent: Math.random() * 90,
            photo: faker.image.url(),
            quantity: Math.random() * 100,
            unit: 'units',
            stock: Math.random() * 100,
            address_id: addresses[Math.floor(Math.random() * addresses.length)].dataValues.id
        }
        const p=Product.build(product);
        await p.save();
        console.log("   -",p.id);
    }
}



const productSeed = async () => {
    await Product.sync({ force: true });
    const sellers = await User.findAll({ where: { isVerified: true, role: 'seller' } });
    
    sellers.forEach(async (seller) => {
        createProduct(seller.dataValues.id, seller.dataValues.email)
    });
    console.log("Product seed done");
}

export default productSeed;
