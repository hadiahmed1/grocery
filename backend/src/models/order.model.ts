import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ordered', 'delivered', 'cancelled'),
        defaultValue: 'ordered'
    },
    delivery_date: {
        type: DataTypes.DATE,
        defaultValue: () => {//default to 1 week
            const now = new Date();
            now.setDate(now.getMinutes() + Math.ceil(Math.random() * 5));//delivery time of 1-5 mins for now
            return now;
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true
}
);

export default Order;