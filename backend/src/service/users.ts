import dbConnection from "../config/sqlConfig";
import User, { NewUser } from "../types/user.type"
export const getUsers = async (): Promise<User[]> => {
    try {
        const [results] = await dbConnection.query(
            'SELECT *,BIN_TO_UUID(id) as uid FROM `users`'
        );
        return results as User[];
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const insertUser = async (user: NewUser): Promise<void> => {
    const query = `
      INSERT INTO users (
        username,
        email,
        phno,
        user_password,
        address_id
      ) VALUES (?, ?, ?, ?, ?);
    `;

    const {
        username,
        email,
        phno,
        user_password,
        address_id = null
    } = user;
    try {
        await dbConnection.query(query, [
            username,
            email,
            phno,
            user_password,
            address_id
        ]);
    } catch (error) {
        console.log("Error while inserting User");
        console.log(error);
    }
}

export const getUserById = async (id: Buffer): Promise<User | null> => {
    try {
        console.log("\n\n User id =", id)
        const query = 'SELECT *,BIN_TO_UUID(id) as uid FROM `users` WHERE id=?';
        const [results] = await dbConnection.query(query, [id]);
        if (Array.isArray(results) && results.length > 0) {
            return results[0] as User;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const verifyUser = async (id: Buffer): Promise<void> => {
    try {
        console.log("\n\n User id =", id)
        const query = 'UPDATE `users` SET isVerified=1 WHERE id=?';
        const [results] = await dbConnection.query(query, [id]);
        console.log(results)
    } catch (err) {
        console.log(err);
    }
}