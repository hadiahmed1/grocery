import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const CartItem = sequelize.define('cartitem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
}
);

export default CartItem;