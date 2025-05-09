import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

interface CartItemAttributes {
  id: string;
  user_id: string;
  product_id: string;
  count: number;
  deletedAt?: Date | null;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id' | 'count' | 'deletedAt'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes {
  public id!: string;
  public user_id!: string;
  public product_id!: string;
  public count!: number;
  public deletedAt?: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartitem',
    timestamps: true,
    paranoid: true,
  }
);

export default CartItem;
