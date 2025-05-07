import User from "../models/user.model";

export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user?.dataValues;
}
