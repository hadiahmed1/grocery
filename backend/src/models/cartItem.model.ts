import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const CartItem = sequelize.define('cartitem', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false
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