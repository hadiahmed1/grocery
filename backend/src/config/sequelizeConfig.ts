import {Sequelize} from 'sequelize';
import User from '../models/user.model';
const dbConnection = async () => {
        const sequelize = new Sequelize('groceryDB', 'grocery', process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        });
        await sequelize.authenticate();
        
        console.log('Connection has been established successfully.');
        return sequelize;
}

export default await dbConnection();