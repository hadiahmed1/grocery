import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

const dbConnection = (): Connection => {
    const access: ConnectionOptions = {
        user: 'grocery',
        password: 'grocery',
        database: process.env.DB_PASSWORD,
    };

    const conn = mysql.createConnection(access);
    console.log("Connection:>>", conn);

    return conn;
}

export default dbConnection;