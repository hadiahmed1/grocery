import dbConnection from "../config/sqlConfig";
import sequelize from '../config/sqlConfig';
import User from "../models/user.model";
import UserType, { NewUserType } from "../types/user.type";

export const getUsers = async (): Promise<UserType[]> => {
    try {
        const [results] = await dbConnection.query(
            'SELECT *,BIN_TO_UUID(id) as uid FROM `users`'
        );
        return results as UserType[];
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const insertUser = async (newUser: NewUserType): Promise<void> => {
    try {
        const user = User.build(newUser);
        await user.save();
    } catch (error) {
        console.log("Error while inserting New User :>>", error);
    }
}

export const getUserById = async (id: Buffer): Promise<UserType | null> => {
    try {
        const query = 'SELECT *,BIN_TO_UUID(id) as uid FROM `users` WHERE id=?';
        const [results] = await dbConnection.query(query, [id]);
        if (Array.isArray(results) && results.length > 0) {
            return results[0] as UserType;
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