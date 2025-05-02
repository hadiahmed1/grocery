import dbConnection from "../config/sqlConfig";
import User, { NewUser } from "../types/user.type"
export const getUsers = async (): Promise<User[]> => {
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM `users`'
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
};


