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
        type: DataTypes.ENUM('ordered', 'delivered', 'out_for_delivery', 'cancelled'),
        defaultValue: 'ordered'
    },
    delivery_date: {
        type: DataTypes.DATE,
        defaultValue: () => {//default to 1 week
            const now = new Date();
            now.setDate(now.getDate() + 1);
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