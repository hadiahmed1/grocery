import { faker } from '@faker-js/faker';
import Address from '../src/models/adress.model';
import User from '../src/models/user.model';

const addressSeed = async () => {
    await Address.sync({ force: true });
    const users = await User.findAll({ where: { isVerified: true } });
    users.forEach(user => {
        const count = Math.floor(Math.random() * 3) + 1;//max 3 addresses per user
        for (let i = 0; i < count; i++) {
            const address = {
                name: faker.location.secondaryAddress(),
                user_id: user.id,
                line1: faker.location.buildingNumber(),
                line2: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                pincode: faker.location.zipCode(),
            }
            Address.build(address).save();
        }
    });

    console.log("address seed done");
}

export default addressSeed;