// models/Product.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import ProductAttributes, { ProductCreationAttributes } from '../types/product.type';

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  id!: string;
  seller_id!: string;
  name!: string;
  mrp!: number;
  discount_percent?: number;
  quantity?: number;
  unit?: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
  photo?: string | null;
  description?: string | null;
  stock?: number;
  address_id?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seller_id: {
    type: DataTypes.STRING, // FK to User
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  mrp: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  discount_percent: {
    type: DataTypes.DECIMAL(4, 2),
    defaultValue: 0.00
  },
  quantity: {
    type: DataTypes.SMALLINT.UNSIGNED,
    defaultValue: 1
  },
  unit: {
    type: DataTypes.ENUM('piece', 'units', 'kg', 'g', 'mg', 'lb', 'ml', 'l'),
    defaultValue: 'units'
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  },
  address_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'products',
  timestamps: true,
  paranoid: true
});

export default Product;
