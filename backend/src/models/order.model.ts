import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

interface OrderAttributes {
  id: string;
  user_id: string;
  status: 'ordered' | 'delivered' | 'cancelled';
  isPaid: boolean;
  delivery_date: Date;
  deletedAt?: Date | null;
}

type OrderCreationAttributes = Omit<OrderAttributes, 'id' | 'status' | 'delivery_date' | 'isPaid' | 'deletedAt'>

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  isPaid: boolean = false;
  public id!: string;
  public user_id!: string;
  public status: 'ordered' | 'delivered' | 'cancelled' = 'ordered';
  public delivery_date!: Date;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
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
    status: {
      type: DataTypes.ENUM('ordered', 'delivered', 'cancelled'),
      defaultValue: 'ordered',
    },
    delivery_date: {
      type: DataTypes.DATE,
      defaultValue: () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + Math.ceil(Math.random() * 5)); // mock delivery 1-5 mins
        return now;
      },
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
  }
);

export default Order;
