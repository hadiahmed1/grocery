import { Sequelize } from 'sequelize';

const dbConnection = async () => {
    const sequelize = new Sequelize('groceryDB', 'grocery', 'groceryPassword', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    return sequelize;
}

export default await dbConnection();