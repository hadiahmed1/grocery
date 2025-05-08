import { faker, tr } from '@faker-js/faker';
import User from '../src/models/user.model';
import { UserCreationAttributes } from '../src/types/user.type';

const userSeed = async (n: number) => {
    await User.sync({ force: true });
    for (let i = 0; i < n; i++) {
        const user: UserCreationAttributes = {
            username: faker.person.fullName(),
            email: `hadiahmed0112+${i}@gmail.com`,
            user_password: `pass${i}`,
            isVerified: (Math.random() > 0.25),
            phno: faker.phone.number().slice(0,12),
            role: (Math.random() < 0.7) ? 'user' : 'seller',
        }
        User.build(user).save();
    }
    console.log("user seed done");
}

export default userSeed;