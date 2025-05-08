import { faker, tr } from '@faker-js/faker';
import Address from '../src/models/adress.model';
import User from '../src/models/user.model';

const addressSeed = async (n: number) => {
    await Address.sync({ force: true });
    const users = await User.findAll({ where: { isVerified: true } });
    for (let i = 0; i < n; i++) {
        const address = {
            name: faker.location.secondaryAddress(),
            user_id: users[Math.floor(Math.random() * users.length)].id,
            line1: faker.location.buildingNumber(),
            line2: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            pincode: faker.location.zipCode(),
        }
        Address.build(address).save();
    }
    console.log("address seed done");
}

export default addressSeed;