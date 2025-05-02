import dbConnection from "../config/sqlConfig";
import User from "../types/user.type"
export const getUsers = async (): Promise<User[]> => {
    try {
        const [results] = await (await dbConnection).query(
            'SELECT * FROM `users`'
        );
        return results as User[];
    } catch (err) {
        console.log(err);
        return [];
    }
}
