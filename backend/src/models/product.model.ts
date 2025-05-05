// models/Product.ts
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.BLOB('medium'),
    primaryKey: true,
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.BLOB('medium'), // FK to User
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
    type: DataTypes.BLOB('medium'),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'product',
  timestamps: false
});

export default Product;
