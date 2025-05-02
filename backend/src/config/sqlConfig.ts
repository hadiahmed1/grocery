import mysql, { ConnectionOptions, Connection } from 'mysql2/promise';

const dbConnection = async ():Promise<Connection> => {
    const access: ConnectionOptions = {
        user: 'grocery',
        password: process.env.DB_PASSWORD,
        database: 'groceryDB',
    };

    const conn = await mysql.createConnection(access);
    return conn;
}

export default await dbConnection();