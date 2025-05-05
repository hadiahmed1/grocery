import dbConnection from "../config/sqlConfig";
import User from "../models/user.model";
import { UserAttributes, UserCreationAttributes } from "../types/user.type";

export const getUsers = async (): Promise<UserAttributes[]> => {
    try {
        const users = await User.findAll();
        return users;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const insertUser = async (newUser: UserCreationAttributes): Promise<void> => {
    try {
        const user = User.build(newUser);
        await user.save();
    } catch (error) {
        console.log("Error while inserting New User :>>", error);
    }
}

export const getUserById = async (id: Buffer): Promise<UserAttributes | null> => {
    try {
        const query = 'SELECT *,BIN_TO_UUID(id) as uid FROM `users` WHERE id=?';
        const [results] = await dbConnection.query(query, [id]);
        if (Array.isArray(results) && results.length > 0) {
            return results[0] as UserAttributes;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
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