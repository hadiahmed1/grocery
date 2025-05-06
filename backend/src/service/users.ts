import dbConnection from "../config/sqlConfig";
import User from "../models/user.model";
import { UserAttributes, UserCreationAttributes } from "../types/user.type";

export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user?.dataValues;
}

export const verifyUser = async (id: Buffer): Promise<void> => {
    try {
        const query = 'UPDATE `users` SET isVerified=1 WHERE id=?';
        const [results] = await dbConnection.query(query, [id]);
        if (!results) throw new Error("Couldn't update: No users with ID " + id);
    } catch (err) {
        console.log(err);
    }
}