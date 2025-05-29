import { Sequelize } from 'sequelize';

const dbConnection = async () => {
    const sequelize = new Sequelize(process.env.MYSQL_DATABASE!,
        process.env.MYSQL_USER!,
        process.env.MYSQL_PASSWORD!, {
        host: process.env.MYSQL_HOST || 'mysql',
        dialect: 'mysql',
        logging: false
    });
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    return sequelize;
}

export default await dbConnection();