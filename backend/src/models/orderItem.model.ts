import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

// Define attributes
interface OrderItemAttributes {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  deletedAt?: Date | null;
}

// Optional fields during creation
interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'deletedAt'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  public id!: string;
  public order_id!: string;
  public product_id!: string;
  public quantity!: number;
  public price!: number;
  public deletedAt?: Date | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderitems',
    timestamps: true,
    paranoid: true,
  }
);

export default OrderItem;
